import { takeEvery, call, put, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import axios from 'axios';
import { rootPath } from 'sagas';
import cleanPath from 'utils/cleanPath';
import * as noteDialogActions from 'actions/noteDialogActions';
import * as databaseActions from 'actions/databaseActions';
import * as alertDialogActions from 'actions/alertDialogActions';
import { getNotes } from 'reducers/notesReducer';

export default [takeEvery(LOCATION_CHANGE, handleLocationChange)];

/**
 * If the notes array in the store is empty, fetch notes from the DB, then check to see if we need
 * to set an `activeID` to launch the NoteDialog
 */
export function* handleLocationChange({ payload }) {
  let notes = yield select(getNotes);

  if (!notes.length) {
    try {
      const fetchNotesResponse = yield call([axios, 'get'], '/getNotes');
      yield put(databaseActions.receiveNotesFromDB(fetchNotesResponse.data));
    } catch (e) {
      console.log(e);
    }
    // Update our notes var for checking in `maybeSetActiveID`
    notes = yield select(getNotes);
  }

  const path = payload.location.pathname;

  if (path === rootPath) {
    return;
  }

  const id = cleanPath(path);
  const idExists = yield call([notes, notes.find], n => n.id === id);

  if (id && idExists) {
    yield put(noteDialogActions.setActiveID(id));
  } else {
    yield put(alertDialogActions.showAlert('No note with that ID exists.'));
  }
}
