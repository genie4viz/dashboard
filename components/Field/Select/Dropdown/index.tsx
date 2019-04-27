import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl';
import OutsideClickHandler from 'react-outside-click-handler';

import { KEY_CODES } from '@app/constants/app';

import SelectOption, { IChoice } from '../Option';

import { Container, Empty, Input, OptionContainer } from './styled';

interface ISelectDropdown {
  className?: string;
  intl: InjectedIntl;
  options: IChoice[];
  onClickOption: (option: IChoice) => void;
  onClose: () => void;
  defaultIndex?: number;
}

const SelectDropdown: React.FC<ISelectDropdown> = ({
  className,
  intl: { formatMessage },
  options,
  onClickOption,
  onClose,
  defaultIndex,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  }, []);

  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex || 0);

  const handleInputChange = useCallback(
    (e) => {
      const searchText = e.target.value.toLowerCase();
      setFilteredOptions(
        options.filter((option) => option.name.toLowerCase().indexOf(searchText) !== -1),
      );
    },
    [options],
  );

  const handleMouseOver = useCallback(
    (e: any) => {
      if (e.target.dataset.index) {
        setSelectedIndex(parseInt(e.target.dataset.index, 0));
      }
    },
    [selectedIndex],
  );

  const handleSetNewIndexAndScroll = useCallback(
    (newIndex: number, e: React.KeyboardEvent) => {
      e.preventDefault();
      const optionEl = document.getElementById(`select-dropdown-option-${newIndex}`);
      setSelectedIndex(newIndex);
      if (optionEl) optionEl.focus();
    },
    [selectedIndex],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.keyCode) {
        case KEY_CODES.ENTER: {
          onClickOption(filteredOptions[selectedIndex]);
          break;
        }
        case KEY_CODES.ARROW_UP: {
          const newIndex = Math.max(0, selectedIndex - 1);
          handleSetNewIndexAndScroll(newIndex, e);
          break;
        }
        case KEY_CODES.ARROW_DOWN: {
          const newIndex = Math.min(filteredOptions.length - 1, selectedIndex + 1);
          handleSetNewIndexAndScroll(newIndex, e);
          break;
        }
        case KEY_CODES.ESC: {
          onClose();
          break;
        }
        default:
          break;
      }
    },
    [selectedIndex],
  );

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <Container
        tabIndex={0}
        onMouseOver={handleMouseOver}
        onKeyDown={handleKeyDown}
        className={className}
      >
        <Input
          ref={inputRef}
          placeholder={formatMessage({ id: 'form.record.option.findOption' })}
          onChange={handleInputChange}
        />
        {filteredOptions && filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <OptionContainer
              id={`select-dropdown-option-${index}`}
              isSelected={index === selectedIndex}
              data-index={index}
              key={index}
              onClick={() => onClickOption(option)}
            >
              <SelectOption css={{ maxWidth: '100%' }} choice={option} />
            </OptionContainer>
          ))
        ) : (
          <OptionContainer onClick={onClose}>
            <Empty>
              <FormattedMessage id="form.record.option.empty" />
            </Empty>
          </OptionContainer>
        )}
      </Container>
    </OutsideClickHandler>
  );
};

export default injectIntl(SelectDropdown);
