import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { ChildDataProps } from 'react-apollo';

import CoresList from '@app/components/Core/List';
import CoreListModal from '@app/components/Core/List/Modal';
import Meta from '@app/components/Meta';

import { AddCoreMutationVariables as IAddCoreVar } from '@app/graphql/core/types/AddCoreMutation';
import { RemoveCoreMutationVariables as IRemoveCoreVar } from '@app/graphql/core/types/RemoveCoreMutation';
import { GetWorkspaceCoresQuery_workspace as IWorkspace } from '@app/graphql/workspace/types/GetWorkspaceCoresQuery';
import { GetWorkspacesQuery as IWorkspaces } from '@app/graphql/workspace/types/GetWorkspacesQuery';

import { CoresStore } from '@app/stores/cores';

import { CORE_COLORS } from '@app/theme/color';

const colors = Object.keys(CORE_COLORS);

import { Container } from './styled';

interface IServerProps {
  workspaceId: string;
  workspaces: IWorkspaces;
  workspace: IWorkspace;

  coresRootStore: CoresStore;
}

interface IProps extends IServerProps {
  addCore: (variables: IAddCoreVar) => void;
  removeCore: (variables: IRemoveCoreVar) => void;
  apolloClient: any;
}

interface IGetCoreResponse {
  workspace: IWorkspace;
}

@inject('coresRootStore')
@observer
class Cores extends React.Component<ChildDataProps<IProps, IGetCoreResponse>, {}> {
  @observable private showCoreModal = false;

  public async componentDidMount() {
    this.props.coresRootStore.initStore();
  }

  public render() {
    const cores = this.props.coresRootStore.cores;

    const fakeCores = cores.map((core, index) => ({
      ...core,
      url: core.url,
      color: colors[index % colors.length],
      icon: 'CORE_ICON_1',
    }));

    return (
      <Container>
        <Meta />
        <div>
          {this.props.coresRootStore.isLoadingCoresList ? (
            'Loading'
          ) : (
            <CoresList cores={fakeCores} onOpenCoreModal={() => (this.showCoreModal = true)} />
          )}
        </div>
        {this.showCoreModal && <CoreListModal onClose={() => (this.showCoreModal = false)} />}
      </Container>
    );
  }
}

export default Cores;
