import './Theme/Styles/Style.scss';

import { CssBaseline } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
// import Pushe from 'pushe-webpush';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';
import { useHistory } from 'react-router-dom';

import Notifier from './components/Notifications/Notifications';
import { initRedirect } from './redux/actions/redirect';
import WorkshopRoot from './root/Workshop';
import ZeroJourneyRoot from './root/ZeroJourney';
import MuiTheme from './Theme/MuiThemes/MuiTheme';
import RTLMuiTheme from './Theme/MuiThemes/RTLMuiTheme';
import ZeroJourneyMuiTheme from './Theme/MuiThemes/ZeroJourneyMuiTheme'
import translations from './translations';
import jss from './utils/jssRTL';
// Pushe.init('ld838ykvn2n75poe');
// Pushe.subscribe();

const Workshop = () => (
  <SnackbarProvider>
    <Notifier />
    <CssBaseline />
    <WorkshopRoot />
  </SnackbarProvider>
);

const ZeroJourney = () => (
  <SnackbarProvider>
    <Notifier />
    <CssBaseline />
    <ZeroJourneyRoot />
  </SnackbarProvider>
)

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
        <>
          <ThemeProvider theme={ZeroJourneyMuiTheme}>
            <StylesProvider jss={jss}>
              <ZeroJourney />
            </StylesProvider>
          </ThemeProvider>
          <ThemeProvider theme={RTLMuiTheme}>
            <StylesProvider jss={jss}>
              <Workshop />
            </StylesProvider>
          </ThemeProvider>
        </>
      ) : (
          <>
            <ThemeProvider theme={MuiTheme}>
              <Workshop />
            </ThemeProvider>
          </>
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
