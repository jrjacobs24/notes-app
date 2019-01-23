import sagaUtil from 'utils/sagaTestingUtil';
import { getAction } from 'utils/actionTestingUtils';
import * as alertDialogActions from 'actions/alertDialogActions';
import * as noteDialogActions from 'actions/noteDialogActions';
import effects from '../alertDialogEffects';

const { runAll, store } = sagaUtil();

describe('The `handleAlertNewNoteClick` effect', () => {
  beforeAll(() => {
    runAll(effects);
  });
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch the `openNewNoteDialog` action', () => {
    store.dispatch(alertDialogActions.clickNewNoteButton());
    expect(getAction(store, noteDialogActions.openNewNoteDialog)).not.toBeUndefined();
  });
});
