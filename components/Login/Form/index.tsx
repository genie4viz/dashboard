import React from 'react';
import { Field } from 'react-final-form';

import Button from '@app/components/Button';
import FormInputText from '@app/components/Form/FormInputText';

import {
  composeValidators,
  emailFormat,
  passwordFormat,
  required,
} from '../../../utils/validation';

export interface ILoginForm {
  [propName: string]: any;
}

const LoginForm: React.FC<ILoginForm> = ({ handleSubmit, submitting, hasValidationErrors }) => (
  <form onSubmit={handleSubmit} style={{ width: '400px' }}>
    <Field
      component={FormInputText}
      name="email"
      title="Email"
      type="email"
      validate={composeValidators(required('Email is required'), emailFormat('Invalid email'))}
    />
    <Field
      component={FormInputText}
      name="password"
      title="Password"
      type="password"
      validate={composeValidators(
        required('Password is required'),
        passwordFormat('Invalid password'),
      )}
    />
    <Button
      onClick={handleSubmit}
      isReverse={true}
      isDisabled={hasValidationErrors}
      isLoading={submitting}
    >
      Sign in
    </Button>
  </form>
);

export default LoginForm;
