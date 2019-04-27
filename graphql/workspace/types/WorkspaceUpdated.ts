/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: WorkspaceUpdated
// ====================================================

export interface WorkspaceUpdated_workspaceUpdated {
  __typename: 'Event';
  payload: any | null;
}

export interface WorkspaceUpdated {
  workspaceUpdated: WorkspaceUpdated_workspaceUpdated | null;
}

export interface WorkspaceUpdatedVariables {
  workspaceId: string;
}
