import Head from 'next/head';
import React, { Fragment, useState } from 'react';
import { compose } from 'react-apollo';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { DragDropContextProvider } from 'react-dnd';
import html5Backend from 'react-dnd-html5-backend';

import Meta from '@app/components/Meta';
import DashboardContent from '@app/pages/dashboard/Content';

import { Container, ContainerContent, Wrapper } from './styled';

import * as Color from '@app/theme/color';

export interface IProps extends InjectedIntlProps {

}

class Dashboard extends React.Component<IProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { intl: { formatMessage } } = this.props;
    return (
      <Fragment>
        <Head>
          <title>{formatMessage({ id: 'pageTitle.dashboard' })}</title>
          <meta content="Dashboard Page" name="description" />
        </Head>
        <Meta />
        <Wrapper backgroundColor={Color.COLORS.grayText}>
          <Container>
            <ContainerContent>
              <DragDropContextProvider backend={html5Backend}>
                <DashboardContent></DashboardContent>
              </DragDropContextProvider>
            </ContainerContent>
          </Container>
        </Wrapper>
      </Fragment>
    );
  }
};


export default compose(
  injectIntl,
)(Dashboard as any);
