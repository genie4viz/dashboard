/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWorkspacesQuery
// ====================================================

export interface GetWorkspacesQuery_workspaces_cores_tables {
  __typename: 'Table';
  name: string;
  id: string;
}

export interface GetWorkspacesQuery_workspaces_cores {
  __typename: 'Core';
  id: string;
  name: string;
  tables: (GetWorkspacesQuery_workspaces_cores_tables | null)[];
}

export interface GetWorkspacesQuery_workspaces {
  __typename: 'Workspace';
  id: string;
  name: string;
  cores: (GetWorkspacesQuery_workspaces_cores | null)[];
}

export interface GetWorkspacesQuery {
  workspaces: (GetWorkspacesQuery_workspaces | null)[];
}
