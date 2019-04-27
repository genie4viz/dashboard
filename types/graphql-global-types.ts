/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ColumnType {
  FOREIGN_KEY = 'FOREIGN_KEY',
  TEXT = 'TEXT',
}

export enum ViewType {
  GRID = 'GRID',
}

export interface AddColumnInput {
  workspaceId: string;
  coreId: string;
  tableId: string;
  columnConfig: ColumnConfigInput;
}

export interface AddCoreInput {
  workspaceId: string;
  coreName: string;
}

export interface AddRowInput {
  workspaceId: string;
  coreId: string;
  tableId: string;
}

export interface CellValueInput {
  type: ColumnType;
  text?: string | null;
  foreignRowId?: string | null;
}

export interface ColumnConfigInput {
  type: ColumnType;
  name: string;
  order: number;
  foreignTableId?: string | null;
}

export interface RemoveCoreInput {
  workspaceId: string;
  coreId: string;
}

export interface UpdateCellInput {
  workspaceId: string;
  coreId: string;
  tableId: string;
  columnId: string;
  rowId: string;
  value: CellValueInput;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
