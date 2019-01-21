import { combineReducers } from 'redux';
import notes from './notesReducer';
import noteDialog from './noteDialogReducer';

export default combineReducers({
  notes,
  noteDialog,
});
