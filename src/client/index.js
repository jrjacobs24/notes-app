import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store, { runSaga } from 'store';
import rootSaga from 'sagas';
import App from './App';

runSaga(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
