import { computed, observable } from 'mobx';

export class CoreModel {
  @observable public name = '';

  @observable public tables: any[] = [];

  @observable public workspaceId = '';

  constructor(workspaceId: string, public id: string, name: string, tables: any[]) {
    this.name = name;
    this.tables = tables;
    this.workspaceId = workspaceId;
  }

  @computed
  get defaultTable() {
    return this.tables[0];
  }

  @computed
  get url() {
    if (this.tables.length === 0) {
      // In case of optimistic response, let
      // core route fallback to default table.
      return `/core/${this.workspaceId}/${this.id}`;
    }

    return `/core/${this.workspaceId}/${this.id}/${this.defaultTable.id}`;
  }
}
