import { gql } from 'apollo-boost';

export const GET_WORKSPACES_QUERY = gql`
  query GetWorkspacesQuery {
    workspaces {
      id
      name
      cores {
        id
        name
        tables {
          name
          id
        }
      }
    }
  }
`;
