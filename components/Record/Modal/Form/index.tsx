import React from 'react';

import { glyphs } from '@app/components/Icon';
import { FIELD_TYPES } from '@app/constants/fieldTypes';

import { TableQuery_table_tableData_rows } from '@app/graphql/table/types/TableQuery';
import { stores } from '@app/stores';

import ColumnTypeAttachment from './Attachment';
import ColumnTypeMultilineText from './MultilineText';
import ColumnTypeNumber from './Number';
import ColumnTypeMultiSelect from './Select/MultiSelect';
import ColumnTypeSingleSelect from './Select/SingleSelect';
import ColumnTypeText from './Text';

import { ColumnContainer, ColumnIcon, ColumnTitle, DropdownIcon, TopContainer } from './styled';

const TYPE_MAP: { [key: string]: any } = {
  text: ColumnTypeText,
  number: ColumnTypeNumber,
  multipleAttachment: ColumnTypeAttachment,
  select: ColumnTypeSingleSelect,
  multiSelect: ColumnTypeMultiSelect,
  multilineText: ColumnTypeMultilineText,
};

export interface IRecordModalFormProps {
  row: TableQuery_table_tableData_rows | undefined;
  onSubmit: () => void;
}

const marginMap: { [key: string]: any } = {
  text: 1,
  number: 1,
  multilineText: 1,
};

const RecordModalForm: React.FC<IRecordModalFormProps> = ({ row, onSubmit }) => (
  <form onSubmit={onSubmit}>
    {row &&
      row.cells.map((cell) => {
        const { columnId } = cell!;
        const type = 'text';
        const column = stores.tableStore.getColumnById(columnId);
        const TypeComponent = TYPE_MAP[type] || TYPE_MAP.default;

        return (
          <ColumnContainer removeMarginBottom={marginMap[type]} key={columnId}>
            <TopContainer>
              <ColumnIcon icon={glyphs[FIELD_TYPES[type].icon]} size={{ width: 16, height: 16 }} />
              <ColumnTitle>{column.name}</ColumnTitle>
              <DropdownIcon />
            </TopContainer>
            <TypeComponent css={{ marginBottom: '15px' }} column={column} />
          </ColumnContainer>
        );
      })}
  </form>
);

export default RecordModalForm;
