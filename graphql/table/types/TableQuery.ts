/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ViewType, ColumnType } from './../../../types/graphql-global-types';

// ====================================================
// GraphQL query operation: TableQuery
// ====================================================

export interface TableQuery_table_viewDatas_columns {
  __typename: 'ColumnDefinition';
  id: string;
  name: string;
  type: ColumnType;
  order: number;
  visibility: boolean;
}

export interface TableQuery_table_viewDatas {
  __typename: 'ViewData';
  id: string;
  type: ViewType;
  name: string;
  columns: (TableQuery_table_viewDatas_columns | null)[];
}

export interface TableQuery_table_tableData_rows_cells_value {
  __typename: 'CellValue';
  type: ColumnType;
  foreignRowId: string | null;
  text: string | null;
}

export interface TableQuery_table_tableData_rows_cells {
  __typename: 'CellData';
  id: string;
  columnId: string;
  value: TableQuery_table_tableData_rows_cells_value;
}

export interface TableQuery_table_tableData_rows {
  __typename: 'RowData';
  id: string;
  cells: (TableQuery_table_tableData_rows_cells | null)[];
}

export interface TableQuery_table_tableData {
  __typename: 'TableData';
  rows: (TableQuery_table_tableData_rows | null)[];
}

export interface TableQuery_table {
  __typename: 'TableProjection';
  id: string;
  name: string;
  viewDatas: (TableQuery_table_viewDatas | null)[];
  tableData: TableQuery_table_tableData;
}

export interface TableQuery {
  table: TableQuery_table;
}

export interface TableQueryVariables {
  tableId: string;
}
