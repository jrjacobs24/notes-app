import axios from 'axios';
import sagaUtil from 'utils/sagaTestingUtil';
import { getPayload } from 'utils/actionTestingUtils';
import * as noteCardActions from 'actions/noteCardActions';
import * as databaseActions from 'actions/databaseActions';
import effects from '../noteCardEffects';

jest.mock('axios');
const { runAll, store } = sagaUtil();

const mockNotes = [
  { id: '1', title: 'Example Note', content: 'Test test test' }
];

describe('The `removeNoteFromDB` effect', () => {
  beforeAll(() => {
    runAll(effects);
  });
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch the `receiveNotesFromDB` action with a notes array payload', () => {
    axios.post.mockReturnValueOnce({ data: mockNotes });
    store.dispatch(noteCardActions.clickDeleteNoteButton('2'));

    expect(getPayload(store, databaseActions.receiveNotesFromDB)).toBe(mockNotes);
  });
});
