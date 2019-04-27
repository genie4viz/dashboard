import gql from 'graphql-tag';

export const GET_CORE_QUERY = gql`
  query GetCoreQuery($workspaceId: String!) {
    workspace(workspaceIdInput: { id: $workspaceId }) {
      id
      name
      cores {
        id
        name
        tables {
          id
          name
        }
      }
    }
  }
`;
