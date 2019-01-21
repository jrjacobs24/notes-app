import { takeLatest, all, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as noteDialogActions from 'actions/noteDialogActions';
import * as databaseActions from 'actions/databaseActions';

export default function* rootSaga() {
  yield all([
    takeLatest(noteDialogActions.clickSubmitNoteButton, handleNoteSubmit),
  ]);

  function* handleNoteSubmit({ payload }) {
    yield call(addNoteToDB, payload);
  }

  /**
   * Add Note
   *
   * @param {Object} note
   */
  function* addNoteToDB(note) {
    try {
      const addNoteResponse = yield call([axios, 'post'], '/addNote', { ...note });
      yield put(databaseActions.addNoteFromDB(addNoteResponse.data));
    } catch (e) {
      console.log(e);
      return;
    }
  }
}
