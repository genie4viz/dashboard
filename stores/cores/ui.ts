/**
 * This should act as a view generic ui store.
 * Should not be exposed to components directl, if possible
 * components mutate and read this via root store.
 */

import { action, observable } from 'mobx';

export class UI {
  @observable public isLoadingCoresList = false;

  @action.bound
  public toggleLoadingCoresList() {
    this.isLoadingCoresList = !this.isLoadingCoresList;
  }
}
