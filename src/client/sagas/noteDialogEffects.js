import { call, put, select, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import { getRouterLocation } from 'reducers';
import { rootPath } from 'sagas';
import { getNote } from 'reducers/notesReducer';
import * as noteDialogActions from 'actions/noteDialogActions';
import * as databaseActions from 'actions/databaseActions';

export default [
  takeEvery(noteDialogActions.clickSubmitNoteButton, handleNoteSubmit),
  takeEvery(noteDialogActions.clickCancelButton, handleCancelClick),
];

function* handleNoteSubmit({ payload }) {
  const existingNote = yield select(getNote, payload.id);

  // Add the note to the DB if it doesn't exist in our store.
  // Otherwise update the note object in the DB and then in our store
  if (!existingNote) {
    try {
      const addNoteResponse = yield call([axios, 'post'], '/addNote', { ...payload });
      yield put(databaseActions.addNoteFromDB(addNoteResponse.data));
    } catch (e) {
      console.log(e);
    }
  } else {
    // Update the URL to our root path
    yield put(push(rootPath));
    try {
      const editNoteResponse = yield call([axios, 'post'], '/editNote', { ...payload });
      yield put(databaseActions.updateNoteFromDB(editNoteResponse.data));
    } catch (e) {
      console.log(e);
    }
  }
}

/**
 * Route the user back to the root path if on a note id route. Could've handled this differently by
 * just using the Link component from `react-router-dom` but I wanted to keep the pattern of
 * action -> reducer -> side-effect going, but could definitely be done the more traditional way.
 */
function* handleCancelClick() {
  const { pathname } = yield select(getRouterLocation);
  if (pathname !== rootPath) {
    yield put(push(rootPath));
  }
}
