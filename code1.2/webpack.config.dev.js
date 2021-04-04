var webpack = require('webpack');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var path = require('path');
module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './client/index.js',
      path.resolve(__dirname, './node_modules/antd/dist/antd.js'),
      path.resolve(__dirname, './node_modules/antd/dist/antd.less'),
      // path.resolve(__dirname, './node_modules/antd/lib/button/style/index.js'),
      // path.resolve(__dirname, './node_modules/antd/lib/button/style/css.js'),
      // path.resolve(__dirname, './node_modules/antd/lib/Table/style/index.js'),
      // path.resolve(__dirname, './node_modules/antd/lib/Table/style/css.js'),
      // path.resolve(__dirname, './node_modules/antd/lib/input/style/index.js'),
      // path.resolve(__dirname, './node_modules/antd/lib/input/style/css.js'),
      // path.resolve(__dirname, './public/BaiduJS/BMap.js'),
      // path.resolve(__dirname, './public/BaiduJS/BBMap.js'),
    ],
    vendor: [
      'react',
      'react-dom',
      // 'react-bmap',
    ],
  },

  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: 'http://0.0.0.0:8000/',
  },

  devServer: {
    contentBase: './dist',
    hot: true,
    inline:true
  },
  
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    rules: [
  //     // ant的按需加载
  //     {
  //       test: /\.css$/,
  //       include: /node_modules/,
  //       use: [
  //           require.resolve('style-loader'),
  //           {
  //               loader: require.resolve('css-loader'),
  //               options: {
  //                   importLoaders: 1,
  //               },
  //           },
  //           {
  //               loader: require.resolve('postcss-loader'),
  //               options: {
  //                   // Necessary for external CSS imports to work
  //                   // https://github.com/facebookincubator/create-react-app/issues/2677
  //                   ident: 'postcss',
  //                   plugins: () => [
  //                       require('postcss-flexbugs-fixes'),
  //                       autoprefixer({
  //                           browsers: [
  //                               '>1%',
  //                               'last 4 versions',
  //                               'Firefox ESR',
  //                               'not ie < 9', // React doesn't support IE8 anyway
  //                           ],
  //                           flexbox: 'no-2009',
  //                       }),
  //                   ],
  //               },
  //           },
  //       ],
  //   },
  //   // 正常的网页中的css
  //   {
  //     test: /\.css$/,
  //     exclude: /node_modules/,
  //     use: [
  //         require.resolve('style-loader'),
  //         {
  //             loader: require.resolve('css-loader'),
  //             options: {
  //                 importLoaders: 1,
  //                 modules: true,
  //                 localIdentName: "[name]__[local]___[hash:base64:5]",

  //             },
  //         },
  //         {
  //             loader: require.resolve('postcss-loader'),
  //             options: {
  //                 // Necessary for external CSS imports to work
  //                 // https://github.com/facebookincubator/create-react-app/issues/2677
  //                 ident: 'postcss',
  //                 plugins: () => [
  //                     require('postcss-flexbugs-fixes'),
  //                     autoprefixer({
  //                         browsers: [
  //                             '>1%',
  //                             'last 4 versions',
  //                             'Firefox ESR',
  //                             'not ie < 9', // React doesn't support IE8 anyway
  //                         ],
  //                         flexbox: 'no-2009',
  //                     }),
  //                 ],
  //             },
  //         },
  //     ],
  // },


      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        //include: path.join(__dirname, '/node_modules/antd'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]__[local]__[hash:base64:5]',
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postcssFocus(),
                cssnext({
                  browsers: ['last 2 versions', 'IE > 10'],
                }),
                postcssReporter({
                  clearMessages: true,
                }),
              ],
            },
          },
        ],
      },
      //{
      //   test: /\.css$/,
       //  include: /node_modules/,
       //  use: ['style-loader', 'css-loader'],
       //},
      
      {
        test: /\.(css|less)$/,
        include: /node_modules/,
        use: [{
            loader: 'style-loader' // creates style nodes from JS strings
          },
        {
            loader: 'css-loader' // translates CSS into CommonJ
        },
        {
            loader: 'less-loader', // compiles Less to CSS
            options: {
                javascriptEnabled: true,
                sourceMap: true,
             }
            }]
      },

      {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/, /client\/modules\/NavPage\/components\/Map.js/, ],
        use: 'babel-loader',
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
  ],
    
  // externals:{
  //   'BMap':'BMap'
  // },

};
