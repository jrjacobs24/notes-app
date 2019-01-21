import { takeLatest, takeEvery, all, call, put, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import axios from 'axios';
import * as noteDialogActions from 'actions/noteDialogActions';
import * as databaseActions from 'actions/databaseActions';
import * as noteCardActions from 'actions/noteCardActions';
import { getNotes } from 'reducers/notesReducer';

export default function* rootSaga() {
  yield all([
    takeEvery(LOCATION_CHANGE, handleLocationChange),
    takeLatest(noteDialogActions.clickSubmitNoteButton, handleNoteSubmit),
    takeEvery(noteCardActions.clickDeleteNoteButton, removeNoteFromDB),
  ]);

  function* removeNoteFromDB({ payload }) {
    try {
      const deleteNoteResponse = yield call([axios, 'post'], '/deleteNote', { id: payload });
      yield put(databaseActions.receiveNotesFromDB(deleteNoteResponse.data));
    } catch (e) {
      console.log(e);
      return;
    }
  }

  /**
   * If the notes array in the store is empty, fetch notes from the DB
   */
  function* handleLocationChange({ payload }) {
    let notes = yield select(getNotes);

    if (!notes.length) {
      yield call(fetchNotesFromDB);
    }
  }

  /**
   * Fetch the notes array from the DB
   */
  function* fetchNotesFromDB() {
    try {
      const fetchNotesResponse = yield call([axios, 'get'], '/getNotes');
      yield put(databaseActions.receiveNotesFromDB(fetchNotesResponse.data));
    } catch (e) {
      console.log(e);
      return;
    }
  }

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
