import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from 'reducers';

const sagaMiddleware = createSagaMiddleware();

/** @see https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  createRootReducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

export const runSaga = sagaMiddleware.run;
