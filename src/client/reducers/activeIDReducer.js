import { createReducer } from 'redux-act';
import * as noteDialogActions from 'actions/noteDialogActions';

export default createReducer(
  {
    [noteDialogActions.setActiveID]: (state, id) => id,
  },
  null
);

/** Selectors */
export const getActiveID = state => state.activeID;
