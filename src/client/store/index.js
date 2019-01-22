import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from 'reducers';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

/** @see https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  createRootReducer(history),
  {},
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

export const runSaga = sagaMiddleware.run;
