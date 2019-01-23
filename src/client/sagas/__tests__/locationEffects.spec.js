import { LOCATION_CHANGE } from 'connected-react-router';
import axios from 'axios';
import sagaUtil from 'utils/sagaTestingUtil';
import { getAction, getPayload } from 'utils/actionTestingUtils';
import * as databaseActions from 'actions/databaseActions';
import * as noteDialogActions from 'actions/noteDialogActions';
import * as alertDialogActions from 'actions/alertDialogActions';
import { getNotes } from 'reducers/notesReducer';
import effects from '../locationEffects';

jest.mock('axios');
jest.mock('reducers/notesReducer');

const { runAll, store } = sagaUtil();
const mockNotes = [
  { id: '1', title: 'Example Note', content: 'Test test test' }
];

describe('The `handleLocationChange` effect', () => {
  beforeAll(() => {
    runAll(effects);
  });
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch `receiveNotesFromDB` with a notes array payload if no notes exist in the store', () => {
    getNotes.mockReturnValueOnce([]);
    axios.get.mockReturnValueOnce({ data: mockNotes });
    store.dispatch({ type: LOCATION_CHANGE, payload: { location: { pathname: '/' } } });

    expect(getPayload(store, databaseActions.receiveNotesFromDB)).toBe(mockNotes);
  });

  it('should dispatch `setActiveID` if the route matches a note ID', () => {
    getNotes.mockReturnValueOnce(mockNotes);
    store.dispatch({ type: LOCATION_CHANGE, payload: { location: { pathname: '/1' } } });

    expect(getPayload(store, noteDialogActions.setActiveID)).toBe('1');
  });

  it('should dispatch `showAlert` if the route does not match a note ID', () => {
    getNotes.mockReturnValueOnce(mockNotes);
    store.dispatch({ type: LOCATION_CHANGE, payload: { location: { pathname: '/2' } } });

    expect(getAction(store, alertDialogActions.showAlert)).not.toBeUndefined();
  });
});
