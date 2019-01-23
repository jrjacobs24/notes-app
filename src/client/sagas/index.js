import { all } from 'redux-saga/effects';
import locationEffects from './locationEffects';
import noteCardEffects from './noteCardEffects';
import noteDialogEffects from './noteDialogEffects';
import alertDialogEffects from './alertDialogEffects';

export const rootPath = '/';

export default function* rootSaga() {
  yield all([
    ...locationEffects,
    ...noteDialogEffects,
    ...noteCardEffects,
    ...alertDialogEffects,
  ]);
}
