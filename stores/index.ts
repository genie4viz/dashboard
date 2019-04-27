import { ApolloClient } from 'apollo-boost';
import { useStaticRendering } from 'mobx-react';
import { Router } from 'next-routes';

import { CoresStore } from './cores';
import { CoreStore } from './coreStore';
import { GridStore } from './gridStore';
import { KeyboardStore } from './keyboardStore';
import { TableStore } from './tableStore';
import { WorkspaceStore } from './workspaceStore';

const isServer = !(process as any).browser;
useStaticRendering(isServer);

export function initializeStores(client: ApolloClient<any>, router: Router) {
  return {
    coresRootStore: new CoresStore(client, router),
  };
}

export const stores = {
  workspaceStore: new WorkspaceStore(),
  coreStore: new CoreStore(),
  tableStore: new TableStore(),
  gridStore: new GridStore(),
  keyboardStore: !isServer ? new KeyboardStore() : undefined,
};

// gice stores in to window object.
if (!isServer) {
  (window as any).stores = stores;
}
