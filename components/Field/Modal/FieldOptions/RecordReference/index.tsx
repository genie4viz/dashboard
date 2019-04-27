import React from 'react';
import { ChildDataProps, graphql } from 'react-apollo';
import { Field } from 'react-final-form';

import { FieldCSS, IFieldOptions } from '../shared';

import FormInputSelect from '@app/components/Form/FormInputSelect';
import Spinner from '@app/components/Loading/Spinner';

import { GET_WORKSPACE_CORES_QUERY } from '@app/graphql/workspace/getWorkspaceCores.query';
import { GetWorkspaceCoresQuery as IWorkspace } from '@app/graphql/workspace/types/GetWorkspaceCoresQuery';

const HARDCODED_WORKSPACE: string = 'workspace_id_647b9378-301e-41d2-81e0-fbfa9da2813e';

const RecordReference: React.FC<ChildDataProps<IFieldOptions, IWorkspace>> = ({
  className,
  data: { loading, workspace },
  input: { value },
}) => {
  const cores = workspace ? workspace.cores : [];
  const coreOptions = cores.map((core) => ({ name: core!.name, value: core!.id }));

  const selecedCoreId = value && value.referenceCore;

  let referenceTables = [];
  if (selecedCoreId) {
    const selectedCore: any = cores.find((core) => core!.id === selecedCoreId);
    if (selectedCore) {
      referenceTables = selectedCore.tables;
    }
  }

  const tablesOptions = referenceTables.map((table: any) => ({
    name: table.name,
    value: table.id,
  }));

  return loading ? (
    <Spinner size="small" strokeWidth="2px" />
  ) : (
    <div className={className}>
      <Field
        isSmall={true}
        options={coreOptions}
        titleId="form.field.title.selectCore"
        css={FieldCSS}
        component={FormInputSelect as any}
        name="typeOptions.referenceCore"
      />
      {selecedCoreId && (
        <Field
          isSmall={true}
          options={tablesOptions}
          titleId="form.field.title.selectTable"
          css={FieldCSS}
          component={FormInputSelect as any}
          name="typeOptions.referenceTable"
        />
      )}
    </div>
  );
};

const withGetCoresQuery = graphql(GET_WORKSPACE_CORES_QUERY, {
  options: () => ({ variables: { workspaceId: HARDCODED_WORKSPACE } }),
});

export default withGetCoresQuery(RecordReference as any);
