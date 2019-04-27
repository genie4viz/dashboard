import React from 'react';
import { Field } from 'react-final-form';

import { ITypeComponent } from '../../index';
import MultiSelectForm from './Form';

const ColumnTypeMultiSelect: React.FC<ITypeComponent> = ({ className, column }) => (
  <Field
    className={className}
    column={column}
    component={MultiSelectForm as any}
    name={column.id}
  />
);

export default ColumnTypeMultiSelect;
