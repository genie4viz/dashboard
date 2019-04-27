/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { RemoveCoreInput } from './../../../types/graphql-global-types';

// ====================================================
// GraphQL mutation operation: RemoveCoreMutation
// ====================================================

export interface RemoveCoreMutation_removeCore {
  __typename: 'CoreId';
  id: string;
}

export interface RemoveCoreMutation {
  removeCore: RemoveCoreMutation_removeCore | null;
}

export interface RemoveCoreMutationVariables {
  removeCoreInput: RemoveCoreInput;
}
