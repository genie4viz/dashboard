import FocusTrap from 'focus-trap-react';
import React, { createRef } from 'react';
import { InjectedIntl, injectIntl } from 'react-intl';
import OutsideClickHandler from 'react-outside-click-handler';

import { KEY_CODES } from '@app/constants/app';

import { IOption } from '../index';
import { Container, Option, OptionContainer } from './styled';

export interface IDropdownProps {
  intl: InjectedIntl;
  isIntl?: boolean;
  isSmall?: boolean;
  onClose: () => void;
  onClick: (option: IOption) => void;
  options: IOption[];
  defaultIndex: number;
}

interface IDropdownState {
  selectedIndex: number;
}

class Dropdown extends React.PureComponent<IDropdownProps, IDropdownState> {
  private tabRef: React.RefObject<HTMLInputElement>;

  constructor(props: IDropdownProps) {
    super(props);
    this.tabRef = createRef();
    this.state = {
      selectedIndex: props.defaultIndex || 0,
    };
  }

  public componentDidMount() {
    if (this.tabRef.current) this.tabRef.current.focus();
  }

  public render() {
    const {
      intl: { formatMessage },
      isIntl,
      isSmall,
      options,
      onClick,
      onClose,
    } = this.props;
    const { selectedIndex } = this.state;

    return (
      <FocusTrap>
        <OutsideClickHandler onOutsideClick={onClose}>
          <Container
            ref={this.tabRef}
            tabIndex={0}
            onKeyDown={this.handleKeyDown}
            isSmall={isSmall}
            id="dropdown-option-container"
          >
            {options.map((option: IOption, index: number) => (
              <OptionContainer
                isSelected={index === selectedIndex}
                isSmall={isSmall}
                key={index}
                tabIndex={0}
                id={`dropdown-option-${index}`}
                data-index={index}
                onClick={() => onClick(option)}
                onMouseOver={this.handleMouseOver}
              >
                <Option isSmall={isSmall}>
                  {isIntl ? formatMessage({ id: option.name }) : option.name}
                </Option>
              </OptionContainer>
            ))}
          </Container>
        </OutsideClickHandler>
      </FocusTrap>
    );
  }

  private handleMouseOver = (e: any) => {
    if (e.target.dataset.index) {
      this.setState({ selectedIndex: parseInt(e.target.dataset.index, 0) });
    }
  };

  private handleKeyDown = (e: React.KeyboardEvent) => {
    const { onClick, onClose, options } = this.props;
    const { selectedIndex } = this.state;

    switch (e.keyCode) {
      case KEY_CODES.ENTER: {
        onClick(options[selectedIndex]);
        break;
      }
      case KEY_CODES.ARROW_UP: {
        const newIndex = Math.max(0, selectedIndex - 1);
        this.handleSetNewIndexAndScroll(newIndex, e);
        break;
      }
      case KEY_CODES.ARROW_DOWN: {
        const newIndex = Math.min(options.length - 1, selectedIndex + 1);
        this.handleSetNewIndexAndScroll(newIndex, e);
        break;
      }
      case KEY_CODES.ESC: {
        onClose();
        break;
      }
      default:
        break;
    }
  };

  private handleSetNewIndexAndScroll = (newIndex: number, e: React.KeyboardEvent) => {
    e.preventDefault();
    const optionEl = document.getElementById(`dropdown-option-${newIndex}`);
    this.setState({ selectedIndex: newIndex });
    if (optionEl) optionEl.focus();
  };
}

export default injectIntl(Dropdown);
