import { gql } from 'apollo-boost';

export const ADD_ROW_MUTATION = gql`
  mutation AddRowMutation($addRowInput: AddRowInput!) {
    addRow(addRowInput: $addRowInput) {
      id
    }
  }
`;
