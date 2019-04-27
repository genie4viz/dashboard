import React from 'react';
import { Field } from 'react-final-form';

import FormInputText from '@app/components/Form/FormInputText';
import { FieldCSS, IFieldOptions } from '../shared';

const FieldOptionText: React.FC<IFieldOptions> = ({ className }) => (
  <div className={className}>
    <Field
      css={FieldCSS}
      titleId="form.field.default.text"
      placeholderId="form.field.default.enterDefaultText"
      isSmall={true}
      name="default"
      component={FormInputText}
    />
  </div>
);

export default FieldOptionText;
