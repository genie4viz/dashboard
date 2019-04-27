/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: workspace
// ====================================================

export interface workspace_workspace_cores {
  __typename: 'Core';
  id: string;
  name: string;
}

export interface workspace_workspace {
  __typename: 'Workspace';
  id: string;
  name: string;
  cores: (workspace_workspace_cores | null)[];
}

export interface workspace {
  workspace: workspace_workspace;
}

export interface workspaceVariables {
  workspaceId: string;
}
