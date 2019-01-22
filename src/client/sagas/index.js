import { takeLatest, takeEvery, all, call, put, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import axios from 'axios';
import cleanPath from 'utils/cleanPath';
import * as noteDialogActions from 'actions/noteDialogActions';
import * as databaseActions from 'actions/databaseActions';
import { getNotes } from 'reducers/notesReducer';
import noteCardEffects from './noteCardEffects';
import noteDialogEffects from './noteDialogEffects';

export const rootPath = '/';

export default function* rootSaga() {
  yield all([
    takeEvery(LOCATION_CHANGE, handleLocationChange),
    ...noteDialogEffects,
    ...noteCardEffects,
  ]);

  /**
   * If the notes array in the store is empty, fetch notes from the DB, then check to see if we need
   * to set an `activeID` to launch the NoteDialog
   */
  function* handleLocationChange({ payload }) {
    let notes = yield select(getNotes);

    if (!notes.length) {
      yield call(fetchNotesFromDB);
      // Update our notes var for checking in `maybeSetActiveID`
      notes = yield select(getNotes);
    }

    yield call(maybeSetActiveID, payload.location.pathname, notes);
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

  /**
   * Open the NoteDialog if we're on a note-specific route
   */
  function* maybeSetActiveID(path, notes) {
    if (path === rootPath) {
      return;
    }

    const id = yield call(cleanPath, path);
    const idExists = yield call([notes, notes.find], n => n.id === id);

    if (id && idExists) {
      yield put(noteDialogActions.setActiveID(id));
    } else {
      return;
    }
  }
}
