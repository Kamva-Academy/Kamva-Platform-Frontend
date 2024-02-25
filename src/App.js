import './configs/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

import { Slide, ToastContainer } from 'react-toastify';
import React, { Fragment, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { CacheProvider } from "@emotion/react";
import { connect } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

import createEmotionCache from './configs/CreateEmotionCache'
import selectTheme from './configs/themes';
import Notifier from './components/molecules/Notifications';
import { initParseServer } from './parse/init';
import { resetRedirectAction } from './redux/slices/redirect';
import { useGetPartyQuery } from 'redux/features/PartySlice';
import Root from './routes';
import translations from './translations';
import LinearLoading from 'components/atoms/LinearLoading';

const App = ({
  dir,
  redirectTo,
  resetRedirect,
  loading,
}) => {
  const navigate = useNavigate();

  const { data: party } = useGetPartyQuery();
  useEffect(() => {
    if (party) document.title = party.main_page_header_data.title;
  }, [party])

  useEffect(() => {
    if (redirectTo !== null) {
      navigate(redirectTo);
      resetRedirect();
    }
  }, [redirectTo]);

  useEffect(() => {
    initParseServer();
  }, []);

  useEffect(() => {
    document.body.dir = dir;
  }, [dir]);

  return (
    <Fragment>
      {party &&
        <Helmet>
          <title>{party.main_page_header_data.title}</title>
          <link rel="icon" href={party.logo.mobile_image} />
          <meta name="description" content={party.main_page_header_data.description} />
          <meta name="theme-color" content={party.main_page_header_data.theme_color} />

          <meta property="og:title" content={party.main_page_og_metadata.title} />
          <meta property="og:description" content={party.main_page_og_metadata.description} />
          <meta property="og:type" content={party.main_page_og_metadata.type} />
          <meta property="og:image" content={party.main_page_og_metadata.image} />
          <meta property="og:url" content={party.main_page_og_metadata.url} />
        </Helmet>
      }
      <IntlProvider translations={translations}>
        <CacheProvider value={createEmotionCache(dir)}>
          <ThemeProvider theme={selectTheme(dir)}>
            <SnackbarProvider>
              <ToastContainer
                rtl
                position="top-right"
                autoClose={3000}
                transition={Slide}
                newestOnTop
                hideProgressBar={false}
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                closeOnClick
                limit={3}
                draggable={false}
              />
              <LinearLoading loading={loading} />
              <Notifier />
              <CssBaseline />
              <Root />
            </SnackbarProvider>
          </ThemeProvider>
        </CacheProvider>
      </IntlProvider>
    </ Fragment>
  );
};

const mapStateToProps = (state) => ({
  dir: state.Intl.locale === 'fa' ? 'rtl' : 'ltr',
  redirectTo: state.redirect.redirectTo,
  forceRedirect: state.redirect.force,
  loading:
    state.account.isFetching ||
    state.events.isFetching ||
    state.currentState.isFetching ||
    state.paper.isFetching,
});

export default connect(mapStateToProps, {
  resetRedirect: resetRedirectAction,
})(App);
