import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { InjectedIntl, injectIntl } from 'react-intl';

import FormError from '../Error';

import { InputContainer, InputTitle, TextArea } from './styled';

export interface IFormInputTextArea extends FieldRenderProps<HTMLElement> {
  id?: string;
  titleId?: string;
  className?: string;
  placeholderId?: string;
  isDisabled?: boolean;
  isSmall?: boolean;
  intl: InjectedIntl;
}

const FormInputTextArea: React.FC<IFormInputTextArea> = ({
  input: { name, onBlur, onChange, onFocus, value },
  intl: { formatMessage },
  meta: { active, error, submitError, submitting, touched, invalid, dirtySinceLastSubmit },
  placeholderId,
  className,
  titleId,
  id,
  isSmall,
}) => {
  const errorMsg = error || submitError;
  const isValidationError = invalid && touched && !!error;
  const isSubmitError = !!invalid && !dirtySinceLastSubmit && !!submitError;
  const isError = (isValidationError || isSubmitError) && !submitting;

  return (
    <InputContainer className={className}>
      {titleId && <InputTitle isSmall={isSmall}>{formatMessage({ id: titleId })}</InputTitle>}
      <TextArea
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
        value={value}
      />
      {isError && <FormError isSmall={isSmall} error={errorMsg} />}
    </InputContainer>
  );
};

export default injectIntl(FormInputTextArea);
