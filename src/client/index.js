import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import store, { runSaga, history } from 'store';
import rootSaga from 'sagas';
import App from './App';

runSaga(rootSaga);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Fragment>
        <Route path="/" render={() => <App />} />
      </React.Fragment>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
