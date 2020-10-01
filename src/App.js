import React from 'react';
import translations from './translations';
import { IntlProvider } from 'react-redux-multilingual';
import { ThemeProvider } from '@material-ui/styles';
import { connect } from 'react-redux';
import MuiTheme from './theme/MuiTheme';
import RTLMuiTheme from './theme/RTLMuiTheme';
import Root from './root/Root';
import jss from './utils/jssRTL';
import { StylesProvider } from '@material-ui/core/styles';
import Notifier from './components/Notifications/Notifications';
import { SnackbarProvider } from 'notistack';

import './assets/styles/App.css';

const AppRout = () => (
  <SnackbarProvider>
    <Notifier />
    <Root />
  </SnackbarProvider>
);

const App = ({ dir }) => {
  document.body.dir = dir;
  return (
    <IntlProvider translations={translations}>
      {dir === 'rtl' ? (
        <ThemeProvider theme={RTLMuiTheme}>
          <StylesProvider jss={jss}>
            <AppRout />
          </StylesProvider>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={MuiTheme}>
          <AppRout />
        </ThemeProvider>
      )}
    </IntlProvider>
  );
};

const mapStateToProps = (state) => ({
  dir: state.Intl.locale === 'fa' ? 'rtl' : 'ltr',
});

export default connect(mapStateToProps)(App);
