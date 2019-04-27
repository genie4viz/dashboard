import cookie from 'cookie';
import { get } from 'lodash';
import { NextFunctionComponent } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import React, { Fragment, useCallback } from 'react';
import { compose, graphql, MutationFn } from 'react-apollo';
import { Form } from 'react-final-form';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import Icon, { glyphs } from '@app/components/Icon';
import LoginForm from '@app/components/Login/Form';
import Meta from '@app/components/Meta';
import { IGraphqlError } from '@app/types/common';

import { LOGIN_MUTATION } from '@app/graphql/auth/login.mutation';
import {
  LoginMutation as ILogin,
  LoginMutation_login as ILoginResponse,
  LoginMutationVariables as ILoginVar,
} from '@app/graphql/auth/types/LoginMutation';

import { Container, ContainerContent, Wrapper } from './styled';

export interface IProps extends InjectedIntlProps {
  login: MutationFn<{}, ILoginVar>;
}

interface IGraphqlResponse {
  data: ILogin;
}

interface IMutationError {
  error: string;
}

const Login: NextFunctionComponent<IProps> = ({ login, intl: { formatMessage } }) => {
  const renderLogin = useCallback((props: any) => <LoginForm {...props} />, []);

  return (
    <Fragment>
      <Head>
        <title>{formatMessage({ id: 'pageTitle.login' })}</title>
        <meta content="Login Page" name="description" />
      </Head>
      <Meta />
      <Wrapper backgroundColor="#526BF0">
        <Container>
          <ContainerContent>
            <Icon icon={glyphs.LOGO_FULL_REVERSE} size={{ width: 400, height: 200 }} />
            <Form onSubmit={login} render={renderLogin} />
          </ContainerContent>
        </Container>
      </Wrapper>
    </Fragment>
  );
};

const withLoginMutation = graphql<{}, ILoginResponse, ILoginVar>(LOGIN_MUTATION, {
  props: ({ mutate }: any): object => ({
    login: (variables: ILoginVar) => {
      mutate({ variables })
        .then(
          ({ data: { login } }: IGraphqlResponse): IMutationError => {
            console.warn('Received a token back: ', login && login.token);
            if (login && login.token) {
              document.cookie = cookie.serialize('token', login.token, {
                maxAge: 7 * 24 * 60 * 60, // 7 days
              });
              Router.push('/cores');
            }

            return { error: 'error' };
          },
        )
        .catch((error: IGraphqlError) => {
          const message = get(error, 'graphQLErrors[0].message', {});
          console.warn('An error occured: ', message);
          if (message.code === 'Unauthorized') {
            return { email: message.message };
          }

          return { password: 'Something went wrong' };
        });
    },
  }),
});

export default compose(
  injectIntl,
  withLoginMutation,
)(Login as any);
