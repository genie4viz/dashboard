/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddColumnInput } from './../../../types/graphql-global-types';

// ====================================================
// GraphQL mutation operation: AddColumnMutation
// ====================================================

export interface AddColumnMutation_addColumn {
  __typename: 'ColumnId';
  id: string;
}

export interface AddColumnMutation {
  addColumn: AddColumnMutation_addColumn | null;
}

export interface AddColumnMutationVariables {
  addColumnInput: AddColumnInput;
}
