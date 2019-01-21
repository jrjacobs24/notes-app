import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

const ScreenHeader = () => (
  <AppBar>
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        Notes For the Taking
      </Typography>
      <Button color="inherit">
        <AddIcon /> New Note
      </Button>
    </Toolbar>
  </AppBar>
);

export default ScreenHeader;
