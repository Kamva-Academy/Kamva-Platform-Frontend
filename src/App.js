import './assets/styles/App.css';
import './assets/styles/landing.css';

import { CssBaseline } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import Pushe from 'pushe-webpush';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';
import { useHistory } from 'react-router-dom';

import Notifier from './components/Notifications/Notifications';
import { initRedirect } from './redux/actions/redirect';
import Root from './root/Root';
import MuiTheme from './theme/MuiTheme';
import RTLMuiTheme from './theme/RTLMuiTheme';
import translations from './translations';
import jss from './utils/jssRTL';
Pushe.init('ld838ykvn2n75poe');
Pushe.subscribe();

const AppRout = () => (
  <SnackbarProvider>
    <Notifier />
    <CssBaseline />
    <Root />
  </SnackbarProvider>
);

const App = ({ dir, redirectTo, forceRedirect, initRedirect }) => {
  const history = useHistory();
  useEffect(() => {
    if (redirectTo !== null) {
      history.push(redirectTo);
      if (forceRedirect) {
        history.push(redirectTo);
        history.push('/loading/');
        history.goBack();
      } else {
        history.push(redirectTo);
      }
      initRedirect();
    }
  }, [redirectTo, forceRedirect, initRedirect, history]);

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
  forceRedirect: state.redirect.force,
});

export default connect(mapStateToProps, { initRedirect })(App);
