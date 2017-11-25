import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import rootReducer from 'reducers';
import { createStore,combineReducers,applyMiddleware} from 'redux';
import routes from './common/routes';
import './client/index.less';
import thunkMiddleware from 'redux-thunk';
import {createLogger } from 'redux-logger'
import {operateReducer} from "./common/container/index_redux";
import {loginReducer} from "./common/pages/login/loginRedux";
import {authReducer} from "./common/auth/authRedux";
import {CommonReduce} from "./page/common/CommonRedux";
// import 'antd/dist/antd.css';

const reduce = combineReducers({
    // rootReducer,
    operateReducer,
    loginReducer,
    authReducer,
    CommonReduce
});

const logger = createLogger({
    // ...options
    level :"log",
    logErrors : true
});

const store = createStore(reduce, applyMiddleware(thunkMiddleware,logger));

store.subscribe(() => {
    console.log(store.getState());
})

ReactDOM.render(
  <Provider store={store}>
      {routes}
  </Provider>,
  document.getElementById('root')
);