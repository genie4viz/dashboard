import React, { useCallback } from 'react';
import { FieldRenderProps } from 'react-final-form';

import { KEY_CODES } from '@app/constants/app';

import { Container } from './styled';

import Icon, { glyphs } from '@app/components/Icon';

export interface ICheckbox extends FieldRenderProps<HTMLElement> {
  className?: string;
  isDisabled?: boolean;
}

const FormInputCheckbox: React.FC<ICheckbox> = ({
  className,
  input: { value, onChange },
  isDisabled,
}) => {
  const handleClick = useCallback(() => onChange(!Boolean(value) as any), [value]);

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.keyCode === KEY_CODES.ENTER) {
        e.preventDefault();
        onChange(!Boolean(value) as any);
      }
    },
    [value],
  );

  const isChecked = Boolean(value);
  return (
    <Container
      className={className}
      isDisabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleOnKeyDown}
      tabIndex={isDisabled ? -1 : 0}
    >
      {isChecked && <Icon size={{ width: 14, height: 14 }} icon={glyphs.CHECKBOX} />}
    </Container>
  );
};

export default FormInputCheckbox;
