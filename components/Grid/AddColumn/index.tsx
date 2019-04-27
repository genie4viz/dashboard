import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import { GridProps } from 'react-virtualized';

import { ADD_COLUMN_MUTATION } from '@app/graphql/table/addColumn.mutation';
import { AddColumnMutationVariables } from '@app/graphql/table/types/AddColumnMutation';
import { stores } from '@app/stores';
import { AddColumnInput, ColumnType } from '@app/types/graphql-global-types';

import ButtonIcon from '@app/components/Button/Icon';
import FieldModal from '@app/components/Field/Modal';
import { glyphs } from '@app/components/Icon';

import { ButtonIconStyle, Container, IconStyle } from './styled';

export interface IAddColumn extends GridProps {
  style: React.CSSProperties;
  addColumn: (variables: AddColumnInput) => void;
}

@observer
class AddColumn extends React.Component<IAddColumn> {
  @observable public isFieldModalOpen: boolean = false;

  public render() {
    const { style, handleSubmit } = this.props;
    return (
      <Fragment>
        <Container style={style}>
          <ButtonIcon
            css={ButtonIconStyle}
            onClick={this.handleModalOpen}
            iconProps={{
              size: { width: 15, height: 15 },
              icon: glyphs.PLUS,
              css: IconStyle,
            }}
          />
        </Container>
        {this.isFieldModalOpen && (
          <FieldModal onSubmit={handleSubmit} onClose={this.handleModalOpen} />
        )}
      </Fragment>
    );
  }

  private handleModalOpen = () => {
    this.isFieldModalOpen = !this.isFieldModalOpen;
  };
}

const withAddColumnMutation = graphql(ADD_COLUMN_MUTATION, {
  props: ({ mutate }: any): object => ({
    handleSubmit: (values: { [key: string]: any }) => {
      const variables: AddColumnMutationVariables = {
        addColumnInput: {
          workspaceId: stores.workspaceStore.activeWorkspaceId!,
          tableId: stores.tableStore.activeTableId!,
          coreId: stores.coreStore.activeCoreId!,
          columnConfig: {
            name: values.name,
            type: ColumnType.TEXT,
            order: stores.tableStore.numColumns,
          },
        },
      };
      mutate({ variables }).then(() => {
        // TODO: @Will Remove Refresh
        window.location.reload(true);
      });
    },
  }),
});

export default compose(withAddColumnMutation)(AddColumn);
