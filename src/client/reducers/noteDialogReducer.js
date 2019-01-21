import { createReducer } from 'redux-act';
import * as screenHeaderActions from 'actions/screenHeaderActions';
import * as noteDialogActions from 'actions/noteDialogActions';

const initialState = {
  open: false,
};

export default createReducer(
  {
    [screenHeaderActions.clickNewNoteButton]: () => ({
      open: true
    }),
    [noteDialogActions.clickCancelButton]: () => initialState,
  },
  initialState
);

/** Selectors */
export const isDialogOpen = state => state.noteDialog.open;