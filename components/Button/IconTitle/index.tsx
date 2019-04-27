import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon, { glyphs } from '@app/components/Icon';

import { ButtonContainer, IButtonContainer } from './styled';

export interface IButton extends IButtonContainer {
  className?: string;
  onClick: React.ReactEventHandler;
  icon?: string;
  isTabable?: boolean;
  titleId: string;
}

const ButtonIconTitle: React.FC<IButton> = ({
  className,
  onClick,
  icon = glyphs.PLUS,
  isTabable = true,
  titleId,
}) => (
  <ButtonContainer className={className} onClick={onClick} tabIndex={isTabable ? 0 : -1}>
    <Icon css={{ marginRight: '5px' }} size={{ width: 12, height: 12 }} icon={icon} />
    <FormattedMessage id={titleId} />
  </ButtonContainer>
);

export default ButtonIconTitle;
