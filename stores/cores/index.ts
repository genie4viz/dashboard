// tslint:disable: max-classes-per-file

import { ApolloClient } from 'apollo-boost';
import { action, computed, observable } from 'mobx';
import { Router } from 'next-routes';

import { AddCoreMutationVariables as IAddCoreVar } from '@app/graphql/core/types/AddCoreMutation';
import { compareTopics } from '@app/lib/subscriptionTopic';

import { CoreModel } from './models/core';
import { Network } from './network';
import { UI } from './ui';

export class CoresStore {
  private readonly ui: UI;
  private readonly network: Network;

  @observable private _workspaceId: string = '';

  @observable private readonly _cores: Map<string, CoreModel> = observable.map();

  constructor(apollo: ApolloClient<any>, private readonly router: Router) {
    this.ui = new UI();
    this.network = new Network(apollo);
  }

  @computed
  public get cores() {
    const cores: CoreModel[] = [];
    this._cores.forEach((core: any) => cores.push(core));
    return cores;
  }

  @computed
  public get isLoadingCoresList() {
    return this.ui.isLoadingCoresList;
  }

  @action.bound
  public async initStore() {
    this.ui.toggleLoadingCoresList();
    const workspaces = await this.network.getAllWorkspaces();
    const workspace = this.network.getDefaultWorkspaceFromWorkspaces(workspaces);

    this._workspaceId = workspace.id;
    this._pushWorkspaceIdToUrl(workspace.id);

    this.ui.toggleLoadingCoresList();
    this._bulkAddCore(workspace.cores);
    this._initSubscription();
  }

  /**
   * Add a new core to current workspace.
   */
  @action.bound
  public async addCore(variables: { coreName: string }) {
    const { coreName } = variables;
    const core = await this.network.addCoreToWorkspace(this._workspaceId, coreName);

    // Optimistically update the UI
    this._addCore({
      id: core.id,
      name: coreName,
      tables: [],
    });
  }

  @action.bound
  public async removeCore(_variables: IAddCoreVar) {
    throw new Error('Not Implemented');
  }

  @action.bound
  private _addCore(core: any) {
    this._cores.set(core.id, new CoreModel(this._workspaceId, core.id, core.name, core.tables));
  }

  @action.bound
  private _bulkAddCore(cores: any[]) {
    cores.forEach((c) =>
      this._cores.set(c.id, new CoreModel(this._workspaceId, c.id, c.name, c.tables)),
    );
  }

  @action.bound
  private _handleCoreCreatedEvent(payload: any) {
    const core = this._cores.get(payload.coreId);

    if (!core) {
      this._addCore({
        id: payload.coreId,
        name: payload.coreName,
        tables: [],
      });
    }
  }

  @action.bound
  private _handleTableCreatedEvent(payload: any) {
    const core = this._cores.get(payload.coreId);
    if (!core) {
      // FIXME: We need a logger.
      // tslint:disable-next-line:no-console
      return console.error('Received an created event for unexisting core.');
    }

    core.tables.push({ id: payload.tableId, name: payload.tableName });
  }

  private _initSubscription() {
    const subscription = this.network.workspaceUpdatedSubscription(this._workspaceId);

    subscription
      .filter((payload: any) => compareTopics(payload.eventName, '#.CoreCreated'))
      .forEach(this._handleCoreCreatedEvent);

    subscription
      .filter((payload: any) => compareTopics(payload.eventName, '#.TableCreated'))
      .forEach(this._handleTableCreatedEvent);
  }

  private _pushWorkspaceIdToUrl(workspaceId: string) {
    if (this.router.query!.workspaceId === this._workspaceId) {
      return;
    }

    this.router.push(`/cores`, `/cores/${workspaceId}`, { shallow: true });
  }
}
