import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScreenHeader from 'components/ScreenHeader';
import ContentWrapper from 'components/ContentWrapper';
import NoteDialog from 'components/NoteDialog';
import 'normalize.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ScreenHeader />
        <ContentWrapper>
          <div>Hello World</div>
          <NoteDialog />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default App;
