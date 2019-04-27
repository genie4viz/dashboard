import { action, observable } from 'mobx';

export class WorkspaceStore {
  @observable private _activeWorkspaceId: string | undefined;

  @action.bound
  public setActiveWorkspace(workspaceId: string) {
    this._activeWorkspaceId = workspaceId;
  }

  public get activeWorkspaceId() {
    return this._activeWorkspaceId;
  }
}
