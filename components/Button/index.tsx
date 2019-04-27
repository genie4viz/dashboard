import React from 'react';

import LoadingSpinner from '@app/components/Loading/Spinner';

import { ButtonContainer, IButtonContainer } from './styled';
export interface IButton extends IButtonContainer {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

const Button: React.FC<IButton> = ({
  className,
  children,
  onClick,
  isLoading,
  isDisabled,
  isSecondary,
  isSmall,
  width,
}) => (
  <ButtonContainer
    className={className}
    onClick={onClick}
    disabled={isDisabled}
    isDisabled={isDisabled}
    isLoading={isLoading}
    isSecondary={isSecondary}
    isSmall={isSmall}
    width={width}
  >
    {isLoading ? <LoadingSpinner size="small" strokeWidth="2px" color="white" /> : children}
  </ButtonContainer>
);

export default Button;
