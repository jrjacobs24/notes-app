import { takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { rootPath } from 'sagas';
import * as noteDialogActions from 'actions/noteDialogActions';
import * as alertDialogActions from 'actions/alertDialogActions';

export default [
  takeEvery(alertDialogActions.clickNewNoteButton, handleAlertNewNoteClick),
  takeEvery(alertDialogActions.clickCloseButton, handleAlertCloseClick),
];

/**
 * Navigate back to our root path, then open the note dialog
 */
function* handleAlertNewNoteClick() {
  yield put(push(rootPath));
  yield put(noteDialogActions.openNewNoteDialog());
}

/**
 * Route the user back to the root path if on a note id route. Could've handled this differently by
 * just using the Link component from `react-router-dom` but I wanted to keep the pattern of
 * action -> reducer -> side-effect going, but could definitely be done the more traditional way.
 */
function* handleAlertCloseClick() {
  yield put(push(rootPath));
}
