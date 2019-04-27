/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWorkspaceCoresQuery
// ====================================================

export interface GetWorkspaceCoresQuery_workspace_cores_tables {
  __typename: 'Table';
  id: string;
}

export interface GetWorkspaceCoresQuery_workspace_cores {
  __typename: 'Core';
  id: string;
  name: string;
  tables: (GetWorkspaceCoresQuery_workspace_cores_tables | null)[];
}

export interface GetWorkspaceCoresQuery_workspace {
  __typename: 'Workspace';
  id: string;
  name: string;
  cores: (GetWorkspaceCoresQuery_workspace_cores | null)[];
}

export interface GetWorkspaceCoresQuery {
  workspace: GetWorkspaceCoresQuery_workspace;
}

export interface GetWorkspaceCoresQueryVariables {
  workspaceId: string;
}
