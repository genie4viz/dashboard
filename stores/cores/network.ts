import { ApolloClient } from 'apollo-boost';

import { ADD_CORE_MUTATION } from '@app/graphql/core/addCore.mutation';
import { GET_WORKSPACES_QUERY } from '@app/graphql/workspace/getWorkspaces.query';
import { GetWorkspacesQuery_workspaces } from '@app/graphql/workspace/types/GetWorkspacesQuery';
import { WORKSPACE_UPDATED_SUBSCRIPTION } from '@app/graphql/workspace/workspaceUpdated.subscribe';

export class Network {
  constructor(public readonly apollo: ApolloClient<any>) {}

  /**
   * Add a single core to workspace.
   */
  public async addCoreToWorkspace(workspaceId: string, coreName: string) {
    const response = await this.apollo.mutate({
      mutation: ADD_CORE_MUTATION,
      variables: { addCoreInput: { workspaceId, coreName } },
    });

    return response.data.addCore;
  }

  /**
   * Returns all workspaces.
   */
  public async getAllWorkspaces(): Promise<GetWorkspacesQuery_workspaces[]> {
    const workspacesQuery = await this.apollo.query({
      query: GET_WORKSPACES_QUERY,
    });

    return workspacesQuery.data.workspaces;
  }

  /**
   * Initializes workspace updated subscription.
   */
  public workspaceUpdatedSubscription(workspaceId: string) {
    const subscription = this.apollo
      .subscribe({
        query: WORKSPACE_UPDATED_SUBSCRIPTION,
        variables: { workspaceId },
      })
      .map((event: any) => event.data.workspaceUpdated.payload);

    return subscription;
  }

  // --- utils

  /**
   * Given a list of workspaces returns the default workspace
   */
  public getDefaultWorkspaceFromWorkspaces(workspaces: GetWorkspacesQuery_workspaces[]) {
    return workspaces[0];
  }
}
