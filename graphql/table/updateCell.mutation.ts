import { gql } from 'apollo-boost';

export const UPDATE_CELL_MUTATION = gql`
  mutation UpdateCellMutation($updateCellInput: UpdateCellInput!) {
    updateCell(updateCellInput: $updateCellInput) {
      id
    }
  }
`;
