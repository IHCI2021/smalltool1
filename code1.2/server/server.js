import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';
// Initialize the Express App
const app = new Express();

// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;
const isProdMode = process.env.NODE_ENV === 'production' || false;

// Run Webpack dev server in development mode
if (isDevMode) {
  // Webpack Requirements
  // eslint-disable-next-line global-require
  const webpack = require('webpack');
  // eslint-disable-next-line global-require
  const config = require('../webpack.config.dev');
  // eslint-disable-next-line global-require
  const webpackDevMiddleware = require('webpack-dev-middleware');
  // eslint-disable-next-line global-require
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    watchOptions: {
      poll: 1000,
    },
  }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import expressJwt from 'express-jwt'
import session from 'express-session'
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import posts from './routes/post.routes';
import dummyData from './dummyData';
import serverConfig from './config';

//添加 citizen路由
import cizizenRouter from './routes/citizen.routes';
import userRouter from './routes/user.routes';
import materialRouter from './routes/material.routes';
// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(serverConfig.mongoURL, (error) => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }
    // 插入dummyData以作测试
    dummyData();
  });
}

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use(Express.static(path.resolve(__dirname, '../dist/client')));
//添加另一个静态文件目录
app.use(Express.static(path.join(__dirname, 'public')));

// 跨域访问(cors)相关设置
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');   // 暂定8100端口
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCrossDomain);

//jwt解析判断
app.use(expressJwt({
  secret:'secret12345',
  algorithms: ['HS256']
}).unless({
  path: ['/api/user/login','/login',
  '/index','/manage/user_password_reset/*','/manage/user_manage',
  '/update_password','/manage/user_create','/create_material_form','/update_material_form/*',
  '/get_material_form/*']
}))
//防止多个用户一起登录
app.use(session({
  secret:"secret",
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:60*60*1000*3}
}))

//============================== 在这启用后端路由 ================================
app.use('/api', posts);
app.use('/api/citizen', cizizenRouter);
app.use('/api/user',userRouter) //两个路由
app.use('/api/material',materialRouter)

//处理未授权的响应
app.use(function(err,req,res,next){
  if(err.name==='UnauthorizedError'){
    res.status(401).send('invalid token')
  }
})
// import Tests from './routes/test.routes';
// const engines = require('consolidate');
// app.engine('html', engines.mustache);
// app.set('view engine', 'html');
// app.use(Express.static(path.join(__dirname, 'public')))
// ejs 配置
// const ejs = require('ejs');
// app.set('view engine', 'ejs');
// app.use('/api/test', Tests);
// app.use('/test', Tests);


//==============================add IP white list================================
var AccessControl = require('express-ip-access-control');
var options = {
  mode: 'allow',
  denys: [],
  allows: ['183.6.159.43',],
  forceConnectionAddress: false,
  log: function(clientIp, access) {
      console.log(clientIp + (access ? ' accessed.' : ' denied.'));
  },

  statusCode: 401,
  redirectTo: '',
  message: 'Unauthorized'
};
// Create middleware.
// var middleware = AccessControl(options);
// app.use(AccessControl(options));
//===========================================================================
// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${isProdMode ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}

        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />

      </head>
      <body>
        <div id="root">${process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${isProdMode ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${isProdMode ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${isProdMode ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = isProdMode ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
