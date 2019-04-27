import React from 'react';
import { InjectedIntl, injectIntl } from 'react-intl';

import { FieldRenderProps } from 'react-final-form';

import FormError from '../Error';

import { Input, InputContainer, InputTitle } from './styled';

export interface IFormInputText extends FieldRenderProps<HTMLElement> {
  className?: string;
  id?: string;
  intl: InjectedIntl;
  isDisabled?: boolean;
  isSmall?: boolean;
  placeholderId?: string;
  titleId?: string;
  type?: string;
  step?: string;
  autoComplete?: string;
}

const FormInputText: React.FC<IFormInputText> = ({
  className,
  id,
  input: { name, onBlur, onChange, onFocus, value },
  intl: { formatMessage },
  isSmall,
  meta: { active, error, submitError, submitting, touched, invalid, dirtySinceLastSubmit },
  placeholderId,
  titleId,
  type,
  step,
  autoComplete,
}) => {
  const errorMsg = error || submitError;
  const isValidationError = invalid && touched && !!error;
  const isSubmitError = !!invalid && !dirtySinceLastSubmit && !!submitError;
  const isError = (isValidationError || isSubmitError) && !submitting;

  return (
    <InputContainer className={className}>
      {titleId && <InputTitle isSmall={isSmall}>{formatMessage({ id: titleId })}</InputTitle>}
      <Input
        step={step}
        autoComplete={autoComplete}
        isSmall={isSmall}
        disabled={submitting}
        id={id}
        isDisabled={submitting}
        isError={isError}
        isFocused={!!active}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholderId ? formatMessage({ id: placeholderId }) : ''}
        type={type}
        value={value}
      />
      {isError && <FormError isSmall={isSmall} error={errorMsg} />}
    </InputContainer>
  );
};

export default injectIntl(FormInputText);
