import React, { useCallback, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';

import SelectDropDown from '@app/components/Field/Select/Dropdown';
import SelectOption, { IChoice } from '@app/components/Field/Select/Option';
import { glyphs } from '@app/components/Icon';
import { ITypeComponent } from '../../../index';
import { choiceOrder, choices } from '../../fakeData';

import { Container, ItemContainer, SelectButton, StyledIcon } from './styled';

export interface IColumnTypeMultiSelect extends FieldRenderProps<HTMLElement>, ITypeComponent {}

const options = [
  { id: '', name: '', color: '' },
  ...choiceOrder.map((choiceId) => choices[choiceId]),
];

const ColumnTypeMultiSelect: React.FC<IColumnTypeMultiSelect> = ({
  className,
  input: { onChange, value },
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClickOption = useCallback(
    (option: IChoice) => {
      onChange(option.id as any);
      setDropdownOpen(false);
    },
    [value, dropdownOpen],
  );

  const handleDropdownOpen = useCallback(
    (e) => {
      e.preventDefault();
      setDropdownOpen(!dropdownOpen);
    },
    [dropdownOpen],
  );

  const selectedIndex = choiceOrder.findIndex((choiceId) => choiceId === value);

  return (
    <Container className={className}>
      <SelectButton onClick={handleDropdownOpen}>
        <ItemContainer>{value && <SelectOption choice={choices[value]} />}</ItemContainer>
        <StyledIcon size={{ height: 10, width: 10 }} icon={glyphs.ARROW_DROPDOWN} />
      </SelectButton>
      {dropdownOpen && (
        <SelectDropDown
          defaultIndex={selectedIndex === -1 ? 1 : selectedIndex + 1}
          onClose={() => setDropdownOpen(false)}
          onClickOption={handleClickOption}
          options={options}
        />
      )}
    </Container>
  );
};

export default ColumnTypeMultiSelect;
