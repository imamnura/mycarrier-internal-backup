import React, { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import { UserDataProvider } from 'src/context/UserData';
import { PopupAlertProvider } from 'src/context/PopupAlert';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import { isUsingLayout, isWindowExist } from '@utils/common';
import thunk from 'redux-thunk';
import { SnackbarProvider } from 'notistack';
import PopupAlert from '@components/PopupAlert';
import PopupAlertOld from '@__old/components/elements/PopupAlert';
import '@styles/style.css';
import '@styles/wysiwyg.css';
import { init } from '@firebaseConfig/utils';
import {
  tagManagerArgs,
  generateTitle,
} from '@utils/analytics';
import DocumentViewer from '@layouts/DocumentViewer';
import { DocumentViewerProvider } from '@context/DocumentViewer';
import WhatsNew from '@fragments/WhatsNew';
import ProgressBar from '@badrap/bar-of-progress';
import Router, { useRouter } from 'next/router';
import color from '@styles/color';
import { PopupConfirmationProvider } from '@context/PopupConfirmation';
import { NotifAchievementProvider } from '@context/NotifAchievement';
import { BillsAndPaymentDetailProvider } from '@context/BillsAndPayment';
import PopupConfirmation from '@components/PopupConfirmation';
import TagManager from 'react-gtm-module';
import ErrorBoundary from '@fragments/ErrorBoundary';

import { hotjar } from 'react-hotjar';
import MaintenancePage from './maintenance';

import { ThemeProvider as LegionProvider } from '@emotion/react';
// import { createTokens } from '@legion-ui/core';
import Layout from '@layouts/Main';
import legionTheme from '@styles/legionTheme';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import Bizy from '@fragments/Bizy';
import privileges from '@configs/privileges';
import AnalyticsProvider from '@configs/analytics/analytics-provider';
import { ForbiddenProvider } from '@fragments/DownloadAuthorization/forbidden-context';

const progress = new ProgressBar({
  size: 2,
  color: color.primary.main,
  delay: 10,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

export default function MyApp(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // add hotjar
    hotjar.initialize(
      process.env.NEXT_PUBLIC_HOTJAR_ID,
      process.env.NEXT_PUBLIC_HOTJAR_VERSION,
    );
  }, []);

  const { pathname, push } = useRouter();

  const recieveNotif = (payload) => {
    const data = payload.notification;

    const body = {
      ...data,
      icon: 'https://internal-mycarrier.telkom.co.id/favicon.ico',
    };

    new Notification(data.title, body);
  };

  useEffect(() => {
    // delete "if" if you want run notif in local
    if (process.env.NODE_ENV === 'production') {
      init(recieveNotif);
    }

    //analytic with GTM
    TagManager.initialize(tagManagerArgs);
  }, []);

  const composeEnhancers =
    (isWindowExist() && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
  );

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MAINTENANCE_STATUS === 'true') {
      push('/maintenance');
    }
  }, [pathname]);

  return (
    <ErrorBoundary>
      <React.Fragment>
        <Head>
          <title>{generateTitle(pathname) || 'MyCarrier Internal'}</title>
          <meta
            content="minimum-scale=1, initial-scale=1, width=device-width"
            name="viewport"
          />
        </Head>
        <LegionProvider theme={legionTheme}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <SnackbarProvider
                autoHideDuration={3000}
                hideIconVariant
                maxSnack={3}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >

                <AnalyticsProvider>
                  <PopupAlertProvider>
                    <PopupConfirmationProvider>
                      <UserDataProvider>
                        <DocumentViewerProvider>
                          <NotifAchievementProvider>
                            <ForbiddenProvider>
                              <BillsAndPaymentDetailProvider>
                                <CssBaseline />
                                {process.env.NEXT_PUBLIC_MAINTENANCE_STATUS ===
                                  'true' ? (
                                  <MaintenancePage />
                                ) : (
                                  <>
                                    {isUsingLayout(pathname) ? (
                                      <Layout>
                                        <Component {...pageProps} />
                                        <AfterLogin
                                          containers={Bizy}
                                          privileges={privileges.chatBot}
                                        />
                                      </Layout>
                                    ) : (
                                      <Component {...pageProps} />
                                    )}
                                    <PopupAlert />
                                    <PopupConfirmation />
                                    <PopupAlertOld />
                                    <DocumentViewer />
                                    <WhatsNew />
                                  </>
                                )}
                              </BillsAndPaymentDetailProvider>
                            </ForbiddenProvider>
                          </NotifAchievementProvider>
                        </DocumentViewerProvider>
                      </UserDataProvider>
                    </PopupConfirmationProvider>
                  </PopupAlertProvider>
                </AnalyticsProvider>

              </SnackbarProvider>
            </Provider>
          </ThemeProvider>
        </LegionProvider>
      </React.Fragment>
    </ErrorBoundary>
  );
}
