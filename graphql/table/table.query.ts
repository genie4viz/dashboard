import { gql } from 'apollo-boost';

export const GET_TABLE_QUERY = gql`
  query TableQuery($workspaceId: String!, $coreId: String!, $tableId: String!) {
    table(tableInput: { workspaceId: $workspaceId, coreId: $coreId, tableId: $tableId }) {
      id
      name
      viewDatas {
        id
        type
        name
        columns {
          id
          name
          type
          order
          visibility
        }
      }
      tableData {
        rows {
          id
          cells {
            id
            columnId
            value {
              type
              foreignRowId
              text
            }
          }
        }
      }
    }
  }
`;
