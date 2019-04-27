import { ApolloClient } from 'apollo-boost';
import cookie from 'cookie';
import Head from 'next/head';
import React from 'react';
import { getDataFromTree } from 'react-apollo';
import initApollo from './initApollo';

function parseCookies(req, options = {}) {
  return cookie.parse(
    // eslint-disable-next-line no-undef
    req ? req.headers.cookie || '' : document.cookie,
    options,
  );
}

export default (App) =>
  class Apollo extends React.Component {
    public static displayName = 'withApollo(App)';

    public static async getInitialProps(ctx: any) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx;
      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(req).token,
        },
      );

      ctx.ctx.apolloClient = apollo;
      let appProps = {};

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }
      // Run all GraphQL qkuueries in the component tree
      // and extract the resulting data

      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App {...appProps} Component={Component} router={router} apolloClient={apollo} />,
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }
    public apolloClient: ApolloClient<any>;

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => parseCookies().token,
      });
    }

    public render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
