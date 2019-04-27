import React from 'react';
import { Field } from 'react-final-form';

import FormInputTextArea from '@app/components/Form/FormInputTextArea';

import { ITypeComponent } from '../index';

const ColumnTypeMultilineText: React.FC<ITypeComponent> = ({ className, column }) => (
  <Field className={className} component={FormInputTextArea} name={column.id} isSmall={true} />
);

export default ColumnTypeMultilineText;
