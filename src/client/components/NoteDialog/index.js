import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import * as noteDialogActions from 'actions/noteDialogActions';
import { isDialogOpen } from 'reducers/noteDialogReducer';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import NoteForm from 'components/NoteForm';

const NoteDialog = ({ open = false, onClickCancel }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Add New Note</DialogTitle>
      <DialogContent>
        <NoteForm />
      </DialogContent>
      <DialogActions>
        <Button variant="text" size="small" onClick={onClickCancel}>
          Cancel
        </Button>
        <Button variant="text" size="small" color="primary" type="submit" form="">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NoteDialog.propTypes = {
  open: T.bool,
  onClickCancel: T.func.isRequired,
};

export default connect(
  state => ({
    open: isDialogOpen(state),
  }),
  {
    onClickCancel: noteDialogActions.clickCancelButton,
  }
)(NoteDialog);
