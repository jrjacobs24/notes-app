import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from 'reducers';

/** @see https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(createRootReducer);
