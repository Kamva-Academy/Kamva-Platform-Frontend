import React, { useEffect } from 'react';
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
import { useHistory } from 'react-router-dom';
import { initRedirect } from './redux/actions/redirect';

import './assets/styles/App.css';
import { CssBaseline } from '@material-ui/core';

const AppRout = () => (
  <SnackbarProvider>
    <Notifier />
    <CssBaseline />
    <Root />
  </SnackbarProvider>
);

const App = ({ dir, redirectTo, initRedirect }) => {
  const history = useHistory();
  useEffect(() => {
    if (redirectTo !== null) {
      history.push(redirectTo);
      initRedirect();
    }
  }, [redirectTo, initRedirect, history]);

  useEffect(() => {
    document.body.dir = dir;
  }, [dir]);

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
  redirectTo: state.redirect.redirectTo,
});

export default connect(mapStateToProps, { initRedirect })(App);
