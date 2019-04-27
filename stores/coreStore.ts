import { action, autorun, computed, observable } from 'mobx';

export class CoreStore {
  @observable private _activeCoreId: string | undefined;

  @action.bound
  public setActiveCoreId(coreId: string) {
    this._activeCoreId = coreId;
  }

  public get activeCoreId() {
    return this._activeCoreId;
  }
}
