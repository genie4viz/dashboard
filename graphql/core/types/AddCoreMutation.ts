/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddCoreInput } from './../../../types/graphql-global-types';

// ====================================================
// GraphQL mutation operation: AddCoreMutation
// ====================================================

export interface AddCoreMutation_addCore {
  __typename: 'CoreId';
  id: string;
}

export interface AddCoreMutation {
  addCore: AddCoreMutation_addCore | null;
}

export interface AddCoreMutationVariables {
  addCoreInput: AddCoreInput;
}
