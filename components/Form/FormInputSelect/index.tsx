import React, { createRef } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { InjectedIntl, injectIntl } from 'react-intl';

import { glyphs } from '@app/components/Icon';
import { KEY_CODES } from '@app/constants/app';

import Dropdown from './Dropdown';

import { Container, Select, StyledIcon, Title, Value, ValueContainer } from './styled';

export interface IOption {
  name: string;
  value: string;
}

export interface ISelectProps extends FieldRenderProps<HTMLElement> {
  className?: string;
  options: IOption[];
  placeholderId?: string;
  titleId?: string;
  isSmall?: boolean;
  isIntl?: boolean;
  intl: InjectedIntl;
}

export interface ISelectState {
  isOpen: boolean;
}

class FormInputSelect extends React.PureComponent<ISelectProps, ISelectState> {
  private tabRef: React.RefObject<HTMLInputElement>;

  constructor(props: ISelectProps) {
    super(props);
    this.tabRef = createRef();
    this.state = {
      isOpen: false,
    };
  }

  public render() {
    const {
      className,
      titleId,
      isSmall,
      options,
      placeholderId,
      input: { onFocus, value },
      intl: { formatMessage },
      isIntl,
    } = this.props;
    const { isOpen } = this.state;
    const selectedIndex = options.findIndex((option) => option.value === value);

    const selectedOptionName =
      selectedIndex === -1
        ? formatMessage({
            id: placeholderId || 'global.selectAnOption',
          })
        : isIntl
        ? formatMessage({ id: options[selectedIndex].name })
        : options[selectedIndex].name;

    return (
      <Container className={className}>
        {!!titleId && <Title isSmall={isSmall}>{formatMessage({ id: titleId })}</Title>}
        <Select
          isOpen={isOpen}
          isSmall={isSmall}
          onClick={this.handleDropdownOpen}
          onKeyDown={this.handleOnKeyDown}
          onFocus={onFocus}
          tabIndex={0}
          ref={this.tabRef}
        >
          <ValueContainer>
            <Value isSmall={isSmall}>{selectedOptionName}</Value>
            <StyledIcon
              isOpen={isOpen}
              icon={glyphs.ARROW_DROPDOWN}
              size={{ width: 10, height: 10 }}
            />
          </ValueContainer>
        </Select>
        {isOpen && (
          <Dropdown
            defaultIndex={selectedIndex === -1 ? 0 : selectedIndex}
            isIntl={isIntl}
            isSmall={isSmall}
            options={options}
            onClose={this.handleDropdownClose}
            onClick={this.handleClickOption}
          />
        )}
      </Container>
    );
  }

  private handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === KEY_CODES.ENTER) {
      e.preventDefault();
      this.setState((state: ISelectState) => ({
        isOpen: !state.isOpen,
      }));
    }
  };

  private handleClickOption = (option: IOption) => {
    const {
      input: { onChange },
    } = this.props;
    this.setState({ isOpen: false });
    onChange(option.value as any);
    if (this.tabRef.current) this.tabRef.current.focus();
  };

  private handleDropdownOpen = () => this.setState({ isOpen: true });
  private handleDropdownClose = () => this.setState({ isOpen: false });
}

export default injectIntl(FormInputSelect);
