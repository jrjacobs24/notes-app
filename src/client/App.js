import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScreenHeader from 'components/ScreenHeader';
import ContentWrapper from 'components/ContentWrapper';
import 'normalize.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ScreenHeader />
        <ContentWrapper>
          <div>Hello World</div>
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default App;
