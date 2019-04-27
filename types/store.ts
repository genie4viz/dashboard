import {
  TableQuery_table,
  TableQuery_table_tableData_rows_cells_value,
} from '@app/graphql/types/TableQuery';
import { ColumnType } from './graphql-global-types';

export interface ICellState {
  selected: boolean;
  cursor: boolean;
  fillHandle: boolean;
}

export interface IRowState {
  selected: boolean;
}

export interface IColumnSortStart {
  columnIndex: number;
  columnId: string;
}

export interface IRowSortStart {
  rowIndex: number;
  rowId: string;
}

export interface ICellData {
  type: ColumnType;
  value: TableQuery_table_tableData_rows_cells_value | null;
  columnId: string;
  rowId: string;
}

export interface ICellPosition {
  columnIndex: number;
  rowIndex: number;
}

export interface ICellDataId {
  columnId: string;
  rowId: string;
}

export interface IInitilizeTablesParams {
  table: TableQuery_table;
  tableId: string;
  workspaceId: string;
  viewId: string;
}
