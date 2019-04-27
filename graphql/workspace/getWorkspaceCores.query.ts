import gql from 'graphql-tag';

export const GET_WORKSPACE_CORES_QUERY = gql`
  query GetWorkspaceCoresQuery($workspaceId: String!) {
    workspace(workspaceIdInput: { id: $workspaceId }) {
      id
      name
      cores {
        id
        name
        tables {
          id
        }
      }
    }
  }
`;
