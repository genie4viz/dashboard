import { concat, without } from 'lodash';
import React, { useCallback, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';

import ButtonIconTitle from '@app/components/Button/IconTitle';
import SelectDropDown from '@app/components/Field/Select/Dropdown';
import SelectOption, { IChoice } from '@app/components/Field/Select/Option';
import { ITypeComponent } from '../../../index';

import { Container, ItemContainer, SelectOptionCSS } from './styled';

import { choiceOrder, choices } from '../../fakeData';

interface IColumnTypeMultiSelect extends FieldRenderProps<HTMLElement>, ITypeComponent {}

const ColumnTypeMultiSelect: React.FC<IColumnTypeMultiSelect> = ({
  className,
  input: { onChange, value },
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClickOption = useCallback(
    (option: IChoice) => {
      onChange(concat(value || [], option.id) as any);
      setDropdownOpen(false);
    },
    [value, dropdownOpen],
  );

  const handleRemoveOption = useCallback(
    (choice: IChoice) => {
      onChange(without(value, choice.id) as any);
    },
    [value],
  );

  const options = without(choiceOrder, ...(value || [])).map((choiceId) => choices[choiceId]);

  return (
    <Container className={className}>
      <ButtonIconTitle titleId="global.selectAnOption" onClick={() => setDropdownOpen(true)} />
      <ItemContainer>
        {value &&
          value.map((choiceId: string) => (
            <SelectOption
              css={SelectOptionCSS}
              onRemove={handleRemoveOption}
              choice={choices[choiceId]}
              key={choiceId}
              multiple={true}
            />
          ))}
      </ItemContainer>
      {dropdownOpen && (
        <SelectDropDown
          onClose={() => setDropdownOpen(false)}
          css={{ top: '0px' }}
          onClickOption={handleClickOption}
          options={options}
        />
      )}
    </Container>
  );
};

export default ColumnTypeMultiSelect;
