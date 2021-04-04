/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
// import Game from './modules/ticToe/index';
// import todoApp from './modules/TodoList/components/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* 由于存在issue:
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288
  异步react路由要与react-hot-reloader一起使用
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  // require('./modules/NavPage/Nav'); // 移除该项目导航功能
  require('./modules/PostForm/index');
  require('./modules/endpage/img');
  require('./modules/ListItem/ListItem')
  require('./modules/ListUser/ListUser')
  require('./modules/login/login')
  require('./modules/manage/reset')
  require('./modules/modify/modify')
  require('./modules/manage/newuser')
  require('./modules/UpdateForm/index')
  // require('./modules/App/img');   //注意每次修改完检查路由表 @wang
  // require('./modules/GetForm/img');
}

// 带有代码拆分的react路由器设置
// 参考: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>

    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
	          cb(null, require('./modules/PostForm/index').default);
           //cb(null, require('./modules/endpage/img').default);
        });
      }}
    />
    {/* <Route
      path="test/nav"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/NavPage/Nav').default);
        });
      }}
    /> */}
    <Route
      path="index"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/ListItem/ListItem').default);
        });
      }}
    />
    <Route
      path="manage/user_manage"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/ListUser/ListUser').default);
        });
      }}
    />
    {/* <Route
      path="test/updatepassword/:username"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/ListUser/UpdatePassword').default);
        });
      }}
    /> */}
    <Route
      path="login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/login/login').default);
        });
      }}
    />
    <Route
      path="create_material_form"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/PostForm/index').default);
        });
      }}
    />
    <Route
      path="manage/user_password_reset/:username"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/manage/reset').default);
        });
      }}
    />
    <Route
      path="update_password"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/modify/modify').default);
        });
      }}
    />
    <Route
      path="manage/user_create"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/manage/newuser').default);
        });
      }}
    />

  <Route
      path="update_material_form/:item_code"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/UpdateForm/index').default);
        });
      }}
    />

    <Route
      path="get_material_form/:item_code"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/endpage/img').default);
        });
      }}
    />

 </Route>

);
