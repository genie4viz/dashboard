import { RouterProps, withRouter } from 'next/router';
import React from 'react';
import { compose, graphql } from 'react-apollo';

import { ADD_ROW_MUTATION } from '@app/graphql/table/addRow.mutation';
import { stores } from '@app/stores';
import { AddRowInput } from '@app/types/graphql-global-types';
import { AddRowWrapper } from './styled';

export interface IAddRow {
  router: RouterProps;
  addRow: (variables: AddRowInput) => void;
}

class AddRow extends React.Component<IAddRow> {
  public render() {
    const params: AddRowInput = {
      workspaceId: stores.workspaceStore.activeWorkspaceId!,
      tableId: stores.tableStore.activeTableId!,
      coreId: stores.coreStore.activeCoreId!,
    };
    const { addRow } = this.props;
    return (
      <div className={AddRowWrapper} onClick={() => addRow(params)}>
        +
      </div>
    );
  }
}

export const withAddRowMutation = graphql<IAddRow, {}, AddRowInput>(ADD_ROW_MUTATION, {
  props: ({ mutate }: any): object => ({
    addRow: (variables: AddRowInput) =>
      mutate({
        variables: { addRowInput: { ...variables } },
      }),
  }),
});

export default compose(
  withRouter,
  withAddRowMutation,
)(AddRow);
