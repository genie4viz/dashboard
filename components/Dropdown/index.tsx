import ModalWrapper from '@app/components/Modal/Wrapper';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Icon, { glyphs } from '@app/components/Icon';
import { KEY_CODES } from '@app/constants/app';

import { Container, OptionContainer, Title } from './styled';

export interface IDropdownOption {
  id: string;
  titleId: string;
  icon?: string;
}

export interface IDropdown {
  className?: string;
  left: number;
  onClick: (option: IDropdownOption) => void;
  onClose: () => void;
  options: IDropdownOption[];
  top: number;
}

const Dropdown: React.FC<IDropdown> = ({ className, left, onClick, onClose, options, top }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClickOption = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      onClick(options[selectedIndex]);
    },
    [selectedIndex, options],
  );

  const handleMouseOver = useCallback((e: any) => {
    if (e.target.dataset.index) {
      setSelectedIndex(parseInt(e.target.dataset.index, 0));
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.keyCode) {
        case KEY_CODES.ENTER: {
          handleClickOption(e);
          break;
        }
        case KEY_CODES.ARROW_UP: {
          e.preventDefault();
          const newIndex = Math.max(0, selectedIndex - 1);
          setSelectedIndex(newIndex);
          break;
        }
        case KEY_CODES.ARROW_DOWN: {
          e.preventDefault();
          const newIndex = Math.min(options.length - 1, selectedIndex + 1);
          setSelectedIndex(newIndex);
          break;
        }
        case KEY_CODES.ESC: {
          e.preventDefault();
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
    <ModalWrapper left={left} isMaskTransparent={true} onClose={onClose} top={top}>
      <Container tabIndex={0} onKeyDown={handleKeyDown} className={className}>
        {options &&
          options.map((option, index) => (
            <OptionContainer
              isSelected={selectedIndex === index}
              data-index={index}
              key={index}
              onClick={handleClickOption}
              onMouseOver={handleMouseOver}
            >
              {option.icon && <Icon icon={glyphs[option.icon]} size={{ width: 20, height: 20 }} />}
              <Title>
                <FormattedMessage id={option.titleId} />
              </Title>
            </OptionContainer>
          ))}
      </Container>
    </ModalWrapper>
  );
};

export default Dropdown;
