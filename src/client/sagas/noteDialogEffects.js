import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import { getRouterLocation } from 'reducers';
import { rootPath } from 'sagas';
import { getNote } from 'reducers/notesReducer';
import * as noteDialogActions from 'actions/noteDialogActions';
import * as databaseActions from 'actions/databaseActions';

export default [
  takeLatest(noteDialogActions.clickSubmitNoteButton, handleNoteSubmit),
];

function* handleNoteSubmit({ payload }) {
  const existingNote = yield select(getNote, payload.id);

  if (!existingNote) {
    yield call(addNoteToDB, payload);
  } else {
    // Update the URL to our root path
    yield put(push(rootPath));
    yield call(updateNoteInDB, payload);
  }
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

/**
 * Edit/Update Note
 */
function* updateNoteInDB(note) {
  try {
    const editNoteResponse = yield call([axios, 'post'], '/editNote', { ...note });
    yield put(databaseActions.updateNoteFromDB(editNoteResponse.data));
  } catch (e) {
    console.log(e);
    return;
  }
}
