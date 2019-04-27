import React from 'react';

import Icon, { IIcon } from '@app/components/Icon';

import { ButtonContainer, IButtonContainer } from './styled';

export interface IButton extends IButtonContainer {
  className?: string;
  onClick: React.ReactEventHandler;
  iconProps: IIcon;
  isTabable?: boolean;
}

const ButtonIcon: React.FC<IButton> = ({ className, onClick, iconProps, isTabable = true }) => (
  <ButtonContainer className={className} onClick={onClick} tabIndex={isTabable ? 0 : -1}>
    <Icon {...iconProps} />
  </ButtonContainer>
);

export default ButtonIcon;
