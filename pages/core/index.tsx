import { find, get } from 'lodash';
import { NextContext } from 'next';
import React, { Fragment } from 'react';
import { ChildDataProps, compose, graphql } from 'react-apollo';

import CoreControls from '@app/components/Core/Controls';
import CoreHeader from '@app/components/Core/Header';
import CoreTabSection from '@app/components/Core/TabSection';
import GridView from '@app/components/Grid';
import Meta from '@app/components/Meta';

import { GET_CORE_QUERY } from '@app/graphql/core/getCore.query';
import { GetCoreQuery_workspace as IWorkspace } from '@app/graphql/core/types/GetCoreQuery.ts';
import { GET_TABLE_QUERY } from '@app/graphql/table/table.query';
import { TableQuery_table as ITable } from '@app/graphql/table/types/TableQuery';

import { stores } from '@app/stores';
import { IContext } from '@app/types/common';
import { Container, HeaderContainer } from './styled';

export interface IProps {
  table: ITable;
  workspaceId: string;
  coreId: string;
  tableId: string;
  viewId: string;
}

interface IGetCoreInputs {
  workspaceId: string;
}

interface IGetCoreResponse {
  workspace: IWorkspace;
}

class Core extends React.Component<ChildDataProps<IProps, IGetCoreResponse>, {}> {
  public static async getInitialProps(context: NextContext & IContext) {
    const { workspaceId, coreId, tableId, viewId } = context.query;

    try {
      const tableQuery = await context.apolloClient.query({
        query: GET_TABLE_QUERY,
        variables: { workspaceId, coreId, tableId },
      });

      if (!viewId) {
        const defaultViewId = get(tableQuery, 'data.table.viewDatas[0].id');
        const target = `/core/${workspaceId}/${coreId}/${tableId}/${defaultViewId}`;
        if (context && context.res) {
          context.res.writeHead(303, { Location: target });
          context.res.end();
        }
      }

      return { viewId, workspaceId, tableId, coreId, table: tableQuery.data.table };
    } catch (err) {
      return { error: err };
    }
  }

  public componentWillMount() {
    const { table, tableId, workspaceId, viewId, coreId } = this.props;
    stores.coreStore.setActiveCoreId(coreId);
    stores.workspaceStore.setActiveWorkspace(workspaceId);
    stores.tableStore.initilize({ table, tableId, workspaceId, viewId });
  }

  public render() {
    const {
      data: { workspace },
      coreId,
    } = this.props;

    const activeCore = workspace!.cores.find((core) => core!.id === coreId);

    return (
      <Fragment>
        <Meta />
        <Container>
          <HeaderContainer>
            <CoreHeader core={activeCore!.name} />
            <CoreTabSection tables={activeCore!.tables || []} />
            <CoreControls />
          </HeaderContainer>
          <div
            style={{
              width: '100vw',
              height: 'calc(100vh - 290px)',
              position: 'absolute',
            }}
          >
            <GridView />
          </div>
        </Container>
      </Fragment>
    );
  }
}

const withGetCoreQuery = graphql<IGetCoreInputs, IGetCoreResponse>(GET_CORE_QUERY, {
  options: ({ workspaceId }) => ({
    variables: { workspaceId },
  }),
});

export default compose(withGetCoreQuery)(Core);
