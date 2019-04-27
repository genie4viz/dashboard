import React from 'react';
import { ChildDataProps, graphql } from 'react-apollo';
import { Field } from 'react-final-form';

import { FieldCSS, IFieldOptions } from '../shared';

import FormInputSelect from '@app/components/Form/FormInputSelect';
import Spinner from '@app/components/Loading/Spinner';

import { GET_WORKSPACE_CORES_QUERY } from '@app/graphql/workspace/getWorkspaceCores.query';
import { GetWorkspaceCoresQuery as IWorkspace } from '@app/graphql/workspace/types/GetWorkspaceCoresQuery';

const HARDCODED_WORKSPACE: string = 'workspace_id_647b9378-301e-41d2-81e0-fbfa9da2813e';

const TableReference: React.FC<ChildDataProps<IFieldOptions, IWorkspace>> = ({
  className,
  data: { loading, workspace },
}) => {
  const cores = workspace ? workspace.cores : [];
  const coreOptions = cores.map((core) => ({ name: core!.name, value: core!.id }));

  return loading ? (
    <Spinner size="small" strokeWidth="2px" />
  ) : (
    <div className={className}>
      <Field
        isSmall={true}
        titleId="form.field.title.selectCore"
        options={coreOptions}
        css={FieldCSS}
        component={FormInputSelect as any}
        name="typeOptions.referenceCore"
      />
    </div>
  );
};

const withGetCoresQuery = graphql(GET_WORKSPACE_CORES_QUERY, {
  options: () => ({ variables: { workspaceId: HARDCODED_WORKSPACE } }),
});

export default withGetCoresQuery(TableReference as any);
