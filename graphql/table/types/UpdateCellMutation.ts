/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateCellInput } from './../../../types/graphql-global-types';

// ====================================================
// GraphQL mutation operation: UpdateCellMutation
// ====================================================

export interface UpdateCellMutation_updateCell {
  __typename: 'TableId';
  id: string;
}

export interface UpdateCellMutation {
  updateCell: UpdateCellMutation_updateCell | null;
}

export interface UpdateCellMutationVariables {
  updateCellInput: UpdateCellInput;
}
