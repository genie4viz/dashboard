import React from 'react';

import { glyphs } from '@app/components/Icon';
import { SELECT_COLOR } from '@app/theme/color';

import { Container, Icon, Name } from './styled';

export interface IChoice {
  id: string;
  name: string;
  color: string;
}

export interface ISelectChoice {
  className?: string;
  multiple?: boolean;
  choice: IChoice;
  onRemove?: (choice: IChoice) => void;
}
const SelectOption: React.FC<ISelectChoice> = ({ className, multiple, choice, onRemove }) => (
  <Container className={className} color={SELECT_COLOR[choice.color]}>
    <Name>{choice.name}</Name>
    {multiple && (
      <Icon
        iconProps={{ size: { width: 10, height: 10 }, icon: glyphs.REMOVE }}
        onClick={() => onRemove && onRemove(choice)}
      />
    )}
  </Container>
);

export default SelectOption;
