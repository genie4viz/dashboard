import FormInputText from '@app/components/Form/FormInputText';
import React from 'react';
import { Field } from 'react-final-form';

import { ITypeComponent } from '../index';

const ColumnTypeText: React.FC<ITypeComponent> = ({ className, column }) => (
  <Field
    className={className}
    autoComplete="off"
    component={FormInputText}
    name={column.id}
    isSmall={true}
  />
);

export default ColumnTypeText;
