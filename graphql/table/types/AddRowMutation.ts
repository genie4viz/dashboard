/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddRowInput } from './../../../types/graphql-global-types';

// ====================================================
// GraphQL mutation operation: AddRowMutation
// ====================================================

export interface AddRowMutation_addRow {
  __typename: 'RowId';
  id: string;
}

export interface AddRowMutation {
  addRow: AddRowMutation_addRow | null;
}

export interface AddRowMutationVariables {
  addRowInput: AddRowInput;
}
