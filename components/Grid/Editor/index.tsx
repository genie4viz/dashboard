import { compose, graphql } from 'react-apollo';

import { UPDATE_CELL_MUTATION } from '@app/graphql/table/updateCell.mutation';
import { ColumnType, UpdateCellInput } from '@app/types/graphql-global-types';
import { SimpleTextEditor } from './SimpleTextEditor';

export function getEditorComponentByColumnType(type: ColumnType) {
  if (type === ColumnType.TEXT) {
    return compose(withUpdateCellMutation)(SimpleTextEditor);
  }

  return (...args: any[]) => <div />;
}

export interface IEditorProps {
  rowId: string;
  columnId: string;
  type: ColumnType;
  updateCell: (variables: UpdateCellInput) => void;
}

export const withUpdateCellMutation = graphql<IEditorProps, {}, UpdateCellInput>(
  UPDATE_CELL_MUTATION,
  {
    props: ({ mutate }: any): object => ({
      updateCell: (variables: UpdateCellInput) =>
        mutate({
          variables: { updateCellInput: { ...variables } },
        }),
    }),
  },
);
