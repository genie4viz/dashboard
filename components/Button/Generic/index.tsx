import React from 'react';

import { ButtonContainer, IButtonContainer } from './styled';

export interface IButton extends IButtonContainer {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

const ButtonGeneric: React.FC<IButton> = ({ className, children, onClick, width }) => (
  <ButtonContainer className={className} onClick={onClick} width={width}>
    {children}
  </ButtonContainer>
);

export default ButtonGeneric;
