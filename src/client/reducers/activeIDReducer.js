import { createReducer } from 'redux-act';
import * as noteDialogActions from 'actions/noteDialogActions';
import * as alertDialogActions from 'actions/alertDialogActions';

const initialState = null;

export default createReducer(
  {
    [noteDialogActions.setActiveID]: (state, id) => id,
    [noteDialogActions.clickCancelButton]: () => initialState,
    [alertDialogActions.clickCloseButton]: () => initialState,
  },
  initialState
);

/** Selectors */
export const getActiveID = state => state.activeID;
