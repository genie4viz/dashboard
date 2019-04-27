/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCoreQuery
// ====================================================

export interface GetCoreQuery_workspace_cores_tables {
  __typename: 'Table';
  id: string;
  name: string;
}

export interface GetCoreQuery_workspace_cores {
  __typename: 'Core';
  id: string;
  name: string;
  tables: (GetCoreQuery_workspace_cores_tables | null)[];
}

export interface GetCoreQuery_workspace {
  __typename: 'Workspace';
  id: string;
  name: string;
  cores: (GetCoreQuery_workspace_cores | null)[];
}

export interface GetCoreQuery {
  workspace: GetCoreQuery_workspace;
}

export interface GetCoreQueryVariables {
  workspaceId: string;
}
