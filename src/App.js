import './configs/styles/App.css';

import React, { useEffect } from 'react';
import { CssBaseline, LinearProgress } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { SnackbarProvider } from 'notistack';
import { CacheProvider } from "@emotion/react";
import { connect } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';
import { useNavigate } from 'react-router-dom';
import createEmotionCache from './configs/createEmotionCache'
import selectTheme from './configs/themes';
import Notifier from './components/Notifications/Notifications';
import { initParseServer } from './parse/init';
import { initRedirectAction } from './redux/slices/redirect';
import Root from './routes';
import translations from './translations';


const App = ({ dir, redirectTo, forceRedirect, initRedirect, loading }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (redirectTo !== null) {
      history(redirectTo);
      if (forceRedirect) {
        navigate(redirectTo);
        navigate('/loading/');
        navigate(-1);
      } else {
        navigate.push(redirectTo);
      }
      initRedirect();
    }
  }, [redirectTo, forceRedirect, initRedirect, navigate]);

  useEffect(() => {
    initParseServer();
  }, []);

  useEffect(() => {
    document.body.dir = dir;
  }, [dir]);

  const Loading = () => {
    if (loading) {
      return (
        <div style={{ width: '100%', position: 'fixed', top: '0px', zIndex: '99999' }}>
          <LinearProgress />
        </div>
      )
    } else {
      return (<></>)
    }
  }

  return (
    <IntlProvider translations={translations}>
      <CacheProvider value={createEmotionCache(dir)}>
        {/* todo: fix theme */}
        <ThemeProvider theme={selectTheme(dir)}>
          <SnackbarProvider>
            <Loading />
            <Notifier />
            <CssBaseline />
            <Root />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </IntlProvider>
  );
};

const mapStateToProps = (state) => ({
  dir: state.Intl.locale === 'fa' ? 'rtl' : 'ltr',
  redirectTo: state.redirect.redirectTo,
  forceRedirect: state.redirect.force,
  loading: state.account.isFetching || state.events.isFetching || state.currentState.isFetching,
});

export default connect(mapStateToProps, { initRedirect: initRedirectAction })(App);
