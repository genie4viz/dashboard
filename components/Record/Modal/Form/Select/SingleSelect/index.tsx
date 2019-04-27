import React from 'react';
import { Field } from 'react-final-form';

import { ITypeComponent } from '../../index';
import SingleSelectForm from './Form';

const ColumnTypeSingleSelect: React.FC<ITypeComponent> = ({ className, column }) => (
  <Field
    className={className}
    column={column}
    component={SingleSelectForm as any}
    name={column.id}
  />
);

export default ColumnTypeSingleSelect;
