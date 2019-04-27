import FormInputText from '@app/components/Form/FormInputText';
import React from 'react';
import { Field } from 'react-final-form';

import { ITypeComponent } from '../index';

const ColumnTypeNumber: React.FC<ITypeComponent> = ({ className, column }) => (
  <Field
    type="number"
    step="any"
    autoComplete="off"
    className={className}
    component={FormInputText}
    name={column.id}
    isSmall={true}
  />
);

export default ColumnTypeNumber;
