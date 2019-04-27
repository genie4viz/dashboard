import { gql } from 'apollo-boost';

export const WORKSPACE_UPDATED_SUBSCRIPTION = gql`
  subscription WorkspaceUpdated($workspaceId: String!) {
    workspaceUpdated(workspaceSubscriptionInput: { workspaceId: $workspaceId }) {
      payload
    }
  }
`;
