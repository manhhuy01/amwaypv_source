import React from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import rootReducer from '.';
import rootSaga from '../saga/saga'


const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
];
const enhancers = [applyMiddleware(...middlewares)];
const createStore = () => {
  const store = reduxCreateStore(rootReducer, {}, ...enhancers);
  console.log(store)
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  }
  store.runSagaTask();
  return store;
}

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);