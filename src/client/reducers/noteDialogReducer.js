import { createReducer } from 'redux-act';
import * as screenHeaderActions from 'actions/screenHeaderActions';
import * as noteDialogActions from 'actions/noteDialogActions';

const initialState = {
  open: false,
  status: '',
};

export default createReducer(
  {
    [screenHeaderActions.clickNewNoteButton]: () => ({
      open: true,
      status: 'add',
    }),
    [noteDialogActions.setActiveID]: () => ({
      open: true,
      status: 'edit',
    }),
    [noteDialogActions.clickSubmitNoteButton]: () => initialState,
    [noteDialogActions.clickCancelButton]: () => initialState,
  },
  initialState
);

/** Selectors */
export const isDialogOpen = state => state.noteDialog.open;
export const getDialogStatus = state => state.noteDialog.status;
