import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import * as noteCardActions from 'actions/noteCardActions';
import * as databaseActions from 'actions/databaseActions';

export default [
  takeLatest(noteCardActions.clickEditNoteButton, handleEditNoteClick),
  takeEvery(noteCardActions.clickDeleteNoteButton, removeNoteFromDB),
];

function* handleEditNoteClick({ payload }) {
  yield put(push(`/${payload}`));
}

function* removeNoteFromDB({ payload }) {
  try {
    const deleteNoteResponse = yield call([axios, 'post'], '/deleteNote', { id: payload });
    yield put(databaseActions.receiveNotesFromDB(deleteNoteResponse.data));
  } catch (e) {
    console.log(e);
  }
}
