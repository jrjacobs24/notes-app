import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Dialog, DialogContent, DialogActions, Typography, Button } from '@material-ui/core';
import { clickCloseButton, clickNewNoteButton } from 'actions/alertDialogActions';
import { isAlertOpen, getAlertMsg } from 'reducers/alertReducer';

const AlertDialog = ({ open = false, msg = '', onClickClose, onClickNewNote }) => (
  <Dialog open={open}>
    <DialogContent>
      <Typography>{msg}</Typography>
      <DialogActions>
        <Button variant="text" size="medium" onClick={onClickClose}>
          Close
        </Button>
        <Button variant="text" size="medium" color="primary" onClick={onClickNewNote}>
          New Note
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
);

AlertDialog.propTypes = {
  open: T.bool,
  msg: T.string,
  onClickClose: T.func.isRequired,
  onClickNewNote: T.func.isRequired,
};

export default connect(
  state => ({
    open: isAlertOpen(state),
    msg: getAlertMsg(state),
  }),
  {
    onClickClose: clickCloseButton,
    onClickNewNote: clickNewNoteButton,
  }
)(AlertDialog);
