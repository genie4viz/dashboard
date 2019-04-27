import { gql } from 'apollo-boost';

export const ADD_COLUMN_MUTATION = gql`
  mutation AddColumnMutation($addColumnInput: AddColumnInput!) {
    addColumn(addColumnInput: $addColumnInput) {
      id
    }
  }
`;
