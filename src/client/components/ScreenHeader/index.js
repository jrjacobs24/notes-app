import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import * as screenHeaderActions from 'actions/screenHeaderActions';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

const ScreenHeader = ({ onNewNoteClick }) => (
  <AppBar>
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        Notes For the Taking
      </Typography>
      <Button color="inherit" onClick={onNewNoteClick}>
        <AddIcon />
        New Note
      </Button>
    </Toolbar>
  </AppBar>
);

ScreenHeader.propTypes = { onNewNoteClick: T.func.isRequired };

export default connect(
  null,
  { onNewNoteClick: screenHeaderActions.clickNewNoteButton }
)(ScreenHeader);
