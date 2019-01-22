import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import notes from './notesReducer';
import noteDialog from './noteDialogReducer';
import activeID from './activeIDReducer';

export default history =>  combineReducers(
  {
    router: connectRouter(history),
    notes,
    noteDialog,
    activeID,
  }
);

/** Selectors */
export const getRouterLocation = state => state.router.location;
