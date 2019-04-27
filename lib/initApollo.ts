import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';
import { WebSocketLink } from 'apollo-link-ws';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'isomorphic-unfetch';

import * as Client from '../graphql/client';

let apolloClient: ApolloClient<any> | any = null;

const GRAPHQL_URI = 'localhost:3000/graphql';
const GRAPHQL_WS_URI = `ws://${GRAPHQL_URI}`;
const GRAPHQL_HTTP_URI = `http://${GRAPHQL_URI}`;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function createConnectionLink() {
  const isBrowser = (process as any).browser;
  let connectionLink;

  const httpLink = new HttpLink({
    uri: GRAPHQL_HTTP_URI,
  });
  connectionLink = httpLink;

  if (isBrowser) {
    const wsLink = new WebSocketLink({
      uri: GRAPHQL_WS_URI,
      options: {
        reconnect: true,
      },
    });

    // FIXME: Auth check.
    connectionLink = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as any;
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink,
    );
  }

  return connectionLink;
}

function create(initialState, { getToken }) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const Cache = new InMemoryCache().restore(initialState || {});

  const connectionLink = createConnectionLink();

  const uploadLink = createUploadLink({
    uri: GRAPHQL_HTTP_URI, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  });

  const stateLink = withClientState({
    cache: Cache,
    defaults: Client.Defaults,
    resolvers: Client.Resolvers,
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token
          ? `Bearer ${token}`
          : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MThkMTU5OS1hZDBhLTQxNzQtYmE4My1kNTEyNzE2MjY4MTQiLCJpYXQiOjE1NTQwOTU2NzQsImV4cCI6MTU1NDY5NTY3NH0.rC0xzVGtgnly6biJXHL7n9bgN1WcukuW_hVx6M2_5a0',
      },
    };
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once).
    link: ApolloLink.from([connectionLink, stateLink, authLink.concat(uploadLink)]),
    cache: Cache,
  });
}

export default function initApollo(initialState, options): ApolloClient<any> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
