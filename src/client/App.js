import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScreenHeader from 'components/ScreenHeader';
import ContentWrapper from 'components/ContentWrapper';
import NotesList from 'components/NotesList';
import NoteDialog from 'components/NoteDialog';
import AlertDialog from 'components/AlertDialog';
import 'normalize.css';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <ScreenHeader />
    <ContentWrapper>
      <NotesList />
      <NoteDialog />
      <AlertDialog />
    </ContentWrapper>
  </React.Fragment>
);

export default App;
