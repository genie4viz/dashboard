import ButtonIcon from '@app/components/Button/Icon';
import { isEqual } from 'lodash';
import React, { createRef } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { InjectedIntl, injectIntl } from 'react-intl';
import OutsideClickHandler from 'react-outside-click-handler';

import { glyphs } from '@app/components/Icon';
import { KEY_CODES } from '@app/constants/app';

import {
  Container,
  FilteredOptionContainer,
  IconClose,
  Input,
  Option,
  OptionIcon,
  OptionName,
} from './styled';

interface IOption {
  key: string;
  value: string;
  icon: string;
}

interface ITypeDropdownProps extends FieldRenderProps<HTMLElement> {
  className: string;
  intl: InjectedIntl;
  isDisabled: boolean;
  onClose: () => void;
  options: IOption[];
  placeholderId: string;
}

interface ITypeDropdownState {
  filteredOptions: IOption[];
  selectedIndex: number;
}

class TypeDropdown extends React.Component<ITypeDropdownProps, ITypeDropdownState> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: ITypeDropdownProps) {
    super(props);
    this.inputRef = createRef();

    const {
      input: { value },
      options,
    } = props;

    const selectedIndex = options.findIndex((option) => option.value === value);
    this.state = {
      selectedIndex: selectedIndex === -1 ? 0 : selectedIndex,
      filteredOptions: props.options,
    };
  }

  public componentDidMount() {
    if (this.inputRef.current) this.inputRef.current.focus();
  }

  public componentWillReceiveProps(nextProps: ITypeDropdownProps) {
    if (!isEqual(this.props.options, nextProps.options)) {
      this.setState({ filteredOptions: nextProps.options, selectedIndex: 0 });
    }
  }

  public render() {
    const {
      intl: { formatMessage },
      className,
      placeholderId,
      isDisabled,
      onClose,
    } = this.props;

    const { filteredOptions, selectedIndex } = this.state;

    return (
      <OutsideClickHandler onOutsideClick={onClose}>
        <Container tabIndex={0} className={className} onKeyDown={this.handleKeyDown}>
          <Input
            disabled={isDisabled}
            onChange={this.handleInputChange}
            placeholder={placeholderId ? formatMessage({ id: placeholderId }) : ''}
            ref={this.inputRef}
          />
          <ButtonIcon
            css={IconClose}
            onClick={onClose}
            iconProps={{ size: { width: 14, height: 14 }, icon: glyphs.REMOVE }}
          />
          <FilteredOptionContainer>
            {filteredOptions.map((option, index) => (
              <Option
                id={`type-option-${index}`}
                disabled={isDisabled}
                isSelected={index === selectedIndex}
                key={index}
                data-index={index}
                onClick={(event) => this.handleClickOption(event)(option)}
                onMouseOver={this.handleMouseOver}
              >
                <OptionIcon size={{ width: 16, height: 16 }} icon={glyphs[option.icon]} />
                <OptionName>{formatMessage({ id: option.key })}</OptionName>
              </Option>
            ))}
          </FilteredOptionContainer>
        </Container>
      </OutsideClickHandler>
    );
  }

  public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterdWord = e.target.value.toLowerCase();
    this.setState({
      filteredOptions: this.props.options.filter(
        (option) => option.key.toLowerCase().indexOf(filterdWord) !== -1,
      ),
    });
  };

  public handleClickOption = (e: React.MouseEvent<HTMLButtonElement>) => (option: IOption) => {
    const {
      input: { onChange },
      onClose,
    } = this.props;
    e.preventDefault();
    // change form value
    onChange(option.value as any);
    // callback
    onClose();
  };

  private handleMouseOver = (e: any) => {
    if (e.target.dataset.index) {
      this.setState({ selectedIndex: parseInt(e.target.dataset.index, 10) });
    }
  };

  private handleKeyDown = (e: React.KeyboardEvent) => {
    const {
      onClose,
      options,
      input: { onChange },
    } = this.props;
    const { selectedIndex } = this.state;
    const option = options[selectedIndex];

    switch (e.keyCode) {
      case KEY_CODES.ENTER: {
        onChange(option.value as any);
        onClose();
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
    const optionEl = document.getElementById(`type-option-${newIndex}`);
    this.setState({ selectedIndex: newIndex });
    if (optionEl) optionEl.focus();
  };
}

export default injectIntl(TypeDropdown);
