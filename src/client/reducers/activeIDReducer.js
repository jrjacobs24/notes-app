import { createReducer } from 'redux-act';
import * as noteDialogActions from 'actions/noteDialogActions';

const initialState = null;

export default createReducer(
  {
    [noteDialogActions.setActiveID]: (state, id) => id,
    [noteDialogActions.clickCancelButton]: () => initialState,
  },
  initialState
);

/** Selectors */
export const getActiveID = state => state.activeID;
