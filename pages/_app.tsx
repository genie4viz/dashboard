import { ApolloClient } from 'apollo-boost';
import { Provider as MobxProvider } from 'mobx-react';
import { Router } from 'next-routes';
import App, { Container } from 'next/app';
import { withRouter } from 'next/router';
import * as React from 'react';
import { ApolloProvider, compose } from 'react-apollo';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import { DEFAULT_LOCALE } from '@app/constants/app';
import withApolloClient from '@app/lib/withApolloClient';
import { initializeStores } from '@app/stores';
import { theme } from '@app/theme';

import { css, Global } from '@emotion/core';
import emotionReset from 'emotion-reset';
import { ThemeProvider } from 'emotion-theming';

import enMessages from '../locales/en.json';
import zhMessages from '../locales/zh.json';

addLocaleData([...en, ...zh]);

const localeMessages: { [key: string]: object } = {
  en: enMessages,
  zh: zhMessages,
};

// Keep a static referance to stores and reuse this
// to make sure shallow url push won't reinitialize the
// stores.
let stores: any;

interface IAppInjectedProps {
  apolloClient: ApolloClient<any>;
  router: Router;
}

class MyApp extends App<any> {
  public componentWillMount() {
    const { apolloClient, router } = this.injected;
    stores = initializeStores(apolloClient, router);
  }

  public render() {
    const { apolloClient } = this.injected;
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <MobxProvider {...stores}>
          <IntlProvider locale={DEFAULT_LOCALE} messages={localeMessages[DEFAULT_LOCALE]}>
            <ApolloProvider client={apolloClient}>
              <ThemeProvider theme={theme}>
                <Global
                  styles={css`
                    ${emotionReset}
                  `}
                />
                <Component {...pageProps} />
              </ThemeProvider>
            </ApolloProvider>
          </IntlProvider>
        </MobxProvider>
      </Container>
    );
  }

  /**
   * Casts props to injected props.
   */
  private get injected(): IAppInjectedProps {
    return this.props as IAppInjectedProps;
  }
}

export default compose(
  withRouter,
  withApolloClient,
)(MyApp);
