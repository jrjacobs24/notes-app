import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import notes from './notesReducer';
import noteDialog from './noteDialogReducer';

export default history =>  combineReducers(
  {
    router: connectRouter(history),
    notes,
    noteDialog,
  }
);

/** Selectors */
export const getRouterLocation = state => state.router.location;
