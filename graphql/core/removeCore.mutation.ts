import gql from 'graphql-tag';

export const REMOVE_CORE_MUTATION = gql`
  mutation RemoveCoreMutation($removeCoreInput: RemoveCoreInput!) {
    removeCore(removeCoreInput: $removeCoreInput) {
      id
    }
  }
`;
