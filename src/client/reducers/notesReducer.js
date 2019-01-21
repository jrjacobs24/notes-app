import { createReducer } from 'redux-act';
import * as databaseActions from 'actions/databaseActions';

const initialState = [];

export default createReducer(
  {
    [databaseActions.receiveNotesFromDB]: (state, notes) => notes,
  },
  initialState
);

/** Selectors */
export const getNotes = state => state.notes;
export const getNote = (state, id) => id && state.notes.find(note => note.id === id);
