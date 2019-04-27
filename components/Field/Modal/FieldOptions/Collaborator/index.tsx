import React from 'react';
import { Field } from 'react-final-form';

import FormInputSwitch from '@app/components/Form/FormInputSwitch';
import { FieldCSS, IFieldOptions } from '../shared';

const FieldOptionCollaborator: React.FC<IFieldOptions> = ({ className }) => (
  <div className={className}>
    <Field
      css={FieldCSS}
      titleId="form.field.option.allowMultiCollab"
      name="typeOptions.multiCollaborator"
      component={FormInputSwitch}
    />
    <Field
      css={FieldCSS}
      titleId="form.field.option.notifyCollabs"
      name="typeOptions.shouldNotify"
      component={FormInputSwitch}
    />
  </div>
);

export default FieldOptionCollaborator;
