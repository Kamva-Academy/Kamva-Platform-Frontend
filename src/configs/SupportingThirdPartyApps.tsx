import * as Sentry from "@sentry/react";
import TagManager from 'react-gtm-module'
import ReactGA from "react-ga4";

const initSentry = () => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS,
    tracesSampleRate: 1.0,
    release: 'production',
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,
    integrations: [new Sentry.Replay()],
  });
}

const initGoogleAnalytics = () => {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
}

const initGoogleTagManager = () => {
  TagManager.initialize({
    gtmId: process.env.REACT_APP_GTM_ID
  });
}

const initClarity = () => {
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", process.env.REACT_APP_CLARITY_TOKEN);
}

const initGoftino = () => {
  (function () {
    var i = process.env.REACT_APP_GOFTINO_TOKEN,
      a = window,
      d = document;
    function g() {
      var g = d.createElement('script'),
        s = 'https://www.goftino.com/widget/' + i,
        l = localStorage.getItem('goftino_' + i);
      (g.async = !0),
        (
          g.src = l ?
            s + '?o=' + l :
            s);
      d
        .getElementsByTagName('head')[0]
        .appendChild(g);
    }
    'complete' === d.readyState ?
      g() :
      a.addEventListener('load', g, !1);
  })();
}

export const initSupportingThirdPartyApps = () => {
  if (process.env.NODE_ENV === 'production') {
    initGoftino();
    initSentry();
    initGoogleAnalytics();
    initGoogleTagManager();
    initClarity();
  }
}


