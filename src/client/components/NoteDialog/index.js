import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import * as noteDialogActions from 'actions/noteDialogActions';
import { isDialogOpen, getDialogStatus } from 'reducers/noteDialogReducer';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import NoteForm from 'components/NoteForm';

const formID = 'note-form';

const NoteDialog = ({ open, status, onClickCancel }) => {
  const title = status === 'edit' ? 'Edit Note' : 'Add Note';
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <NoteForm formID={formID} />
      </DialogContent>
      <DialogActions>
        <Button variant="text" size="medium" onClick={onClickCancel}>
          Cancel
        </Button>
        <Button variant="text" size="medium" color="primary" type="submit" form={formID}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

NoteDialog.defaultProps = { open: false };

NoteDialog.propTypes = {
  open: T.bool,
  status: T.string.isRequired,
  onClickCancel: T.func.isRequired,
};

export default connect(
  state => ({
    open: isDialogOpen(state),
    status: getDialogStatus(state),
  }),
  { onClickCancel: noteDialogActions.clickCancelButton }
)(NoteDialog);
