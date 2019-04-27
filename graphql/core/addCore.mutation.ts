import gql from 'graphql-tag';

export const ADD_CORE_MUTATION = gql`
  mutation AddCoreMutation($addCoreInput: AddCoreInput!) {
    addCore(addCoreInput: $addCoreInput) {
      id
    }
  }
`;
