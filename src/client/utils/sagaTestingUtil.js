/* eslint-disable no-console */
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

export default function setup() {
  const sagaMiddleware = createSagaMiddleware();
  const createStore = configureMockStore([sagaMiddleware]);
  const store = createStore({});

  return {
    store,
    sagaMiddleware,
    run(...args) {
      const task = sagaMiddleware.run(...args);
      task.toPromise().catch(console.log);
      return task;
    },
    runAll(...args) {
      const task = sagaMiddleware.run(function* main() {
        yield all(...args);
      });
      task.toPromise().catch(console.log);
      return task;
    },
  };
}
