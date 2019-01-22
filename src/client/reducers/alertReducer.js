import { createReducer } from 'redux-act';
import * as alertDialogActions from 'actions/alertDialogActions';

const initialState = {
  open: false,
  msg: '',
};

export default createReducer(
  {
    [alertDialogActions.showAlert]: (state, msg) => ({
      open: true,
      msg,
    }),
    [alertDialogActions.hideAlert]: () => initialState,
    [alertDialogActions.clickCloseButton]: () => initialState,
    [alertDialogActions.clickNewNoteButton]: () => initialState,
  },
  initialState
);

/** Selectors */
export const isAlertOpen = state => state.alertDialog.open;
export const getAlertMsg = state => state.alertDialog.msg;
