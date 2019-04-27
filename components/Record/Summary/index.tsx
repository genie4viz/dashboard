import React, { useCallback } from 'react';

import { glyphs } from '@app/components/Icon';

import {
  Container,
  DeleteIcon,
  ItemContainer,
  ItemTitle,
  ItemValue,
  OthersContainer,
  Title,
} from './styled';

export interface IColumnOption {
  id: string;
  name: string;
  type: string;
  value: any;
}

export interface IRecordOption {
  id: string;
  title: string;
  items: IColumnOption[];
}

export interface IRecordSummary {
  className?: string;
  mapIndex?: number;
  isSelected?: boolean;
  onClickOption: (option: IRecordOption) => void;
  onDeleteOption?: (option: IRecordOption) => void;
  onMouseEnter?: React.MouseEventHandler;
  option: IRecordOption;
}

const RecordSummary: React.FC<IRecordSummary> = ({
  className,
  mapIndex,
  isSelected,
  onClickOption,
  onDeleteOption,
  onMouseEnter,
  option,
}) => {
  const { title, items } = option;

  const handleClickOption = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClickOption(option);
  }, []);

  const handleDeleteOption = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDeleteOption) onDeleteOption(option);
  }, []);

  return (
    <Container
      onClick={handleClickOption}
      data-index={mapIndex}
      onMouseEnter={onMouseEnter}
      isSelected={isSelected}
      className={className}
    >
      <Title>{title}</Title>
      <OthersContainer>
        {items.map((item, index) => (
          <ItemContainer key={index}>
            <ItemTitle>{item.name}</ItemTitle>
            <ItemValue>{item.value}</ItemValue>
          </ItemContainer>
        ))}
      </OthersContainer>
      {onDeleteOption && (
        <DeleteIcon
          iconProps={{ size: { height: 12, width: 12 }, icon: glyphs.REMOVE }}
          onClick={handleDeleteOption}
        />
      )}
    </Container>
  );
};

export default RecordSummary;
