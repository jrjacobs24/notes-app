import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import notes from './notesReducer';
import noteDialog from './noteDialogReducer';
import activeID from './activeIDReducer';
import alertDialog from './alertReducer';

export default history => combineReducers(
  {
    router: connectRouter(history),
    notes,
    noteDialog,
    activeID,
    alertDialog,
  }
);

/** Selectors */
export const getRouterLocation = state => state.router.location;
