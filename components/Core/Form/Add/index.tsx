import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import Button from '@app/components/Button';
import FormInputText from '@app/components/Form/FormInputText';

interface ICoreFormAddBaseProps extends FormRenderProps {
  onCancel: () => void;
}

const CoreFormAdd: React.FC<ICoreFormAddBaseProps> = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field component={FormInputText} name="coreName" titleId="form.core.name.title" />
    <div>
      <Button onClick={handleSubmit}>
        <FormattedMessage id="global.save" />
      </Button>
    </div>
  </form>
);

export default CoreFormAdd;
