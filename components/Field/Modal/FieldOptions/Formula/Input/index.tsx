import React, { createRef, Fragment, PureComponent } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import ClickOutside from 'react-outside-click-handler';

import { KEY_CODES } from '@app/constants/app';

import { getRangePosition, removeEscape } from '@app/utils/formula';

import { Input, ItemContainer, ItemName, ItemType, MiddleTitle, OptionContainer } from './styled';

interface IFormulaOption {
  id: string;
  name: string;
  type: string;
  value: string;
}

export interface IFormulaInputProps extends FieldRenderProps<HTMLElement> {
  options: IFormulaOption[];
  className: string;
}

export interface IFormulaInputState {
  filterOptions: IFormulaOption[];
  shouldOpen: boolean;
  selectedIndex: number;
}

class FormulaInput extends PureComponent<IFormulaInputProps, IFormulaInputState> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: IFormulaInputProps) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      filterOptions: props.options,
      shouldOpen: false,
      selectedIndex: 0,
    };
  }

  public render() {
    const {
      input: { value },
      className,
    } = this.props;

    const { filterOptions, shouldOpen, selectedIndex } = this.state;

    return (
      <ClickOutside onOutsideClick={this.close}>
        <div className={className}>
          <Input
            autoComplete="off"
            onChange={this.handleInputChange}
            onClick={this.open}
            onKeyDown={this.handleInputKeyDown}
            onSelect={this.handleInputSelect}
            ref={this.inputRef}
            value={value}
          />
          {filterOptions.length > 0 && shouldOpen && (
            <Fragment>
              <MiddleTitle>
                <FormattedMessage id="field.modal.fieldOptions.formula.insert.function" />
              </MiddleTitle>
              <OptionContainer>
                {filterOptions.map((option, index) => (
                  <ItemContainer
                    key={index}
                    onClick={(e) => this.handleOptionClick(e, option)}
                    selected={index === selectedIndex}
                  >
                    <ItemName type={option.type}>{option.name}</ItemName>
                    <ItemType>{option.type}</ItemType>
                  </ItemContainer>
                ))}
              </OptionContainer>
            </Fragment>
          )}
        </div>
      </ClickOutside>
    );
  }

  public close = () => {
    this.setState({
      shouldOpen: false,
    });
  };

  public open = () => {
    this.setState({
      shouldOpen: true,
    });
  };

  public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      input: { onChange },
    } = this.props;

    if (!this.state.shouldOpen) {
      this.open();
    }

    onChange(e.target.value as any);
  };

  public handleInputKeyDown = (e: React.KeyboardEvent) => {
    switch (e.keyCode) {
      case KEY_CODES.ENTER: {
        e.preventDefault();
        const { filterOptions, selectedIndex } = this.state;
        this.handleOptionClick(e, filterOptions[selectedIndex]);
        break;
      }
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        this.setState((prevState) => ({
          selectedIndex:
            prevState.selectedIndex > 0 ? prevState.selectedIndex - 1 : prevState.selectedIndex,
        }));
        break;
      }
      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        this.setState((prevState) => ({
          selectedIndex:
            prevState.selectedIndex < prevState.filterOptions.length - 1
              ? prevState.selectedIndex + 1
              : prevState.selectedIndex,
        }));
        break;
      }
    }
  };

  public handleInputSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.target;
    const { replaceStartIndex, replaceEndIndex } = getRangePosition({
      value,
      selectionStart: selectionStart || 0,
    });

    const searchText = removeEscape(value.slice(replaceStartIndex, replaceEndIndex));

    const { options } = this.props;

    this.setState({
      selectedIndex: 0,
      filterOptions: options.filter((option) => {
        return option.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      }),
    });
  };

  public handleOptionClick = (
    e: React.MouseEvent | React.KeyboardEvent,
    option: IFormulaOption,
  ) => {
    const {
      input: { value, onChange },
    } = this.props;
    e.preventDefault();

    const inputEl = this.inputRef.current;
    const { replaceStartIndex, replaceEndIndex } = getRangePosition(inputEl as any);

    const insertValue =
      value.slice(0, replaceStartIndex) + option.value + value.slice(replaceEndIndex, value.length);

    onChange(insertValue as any);

    if (inputEl) inputEl.focus();

    this.close();

    const selectionIndex =
      replaceStartIndex +
      (option.type === 'function' ? option.value.length - 1 : option.value.length);

    setTimeout(() => {
      if (inputEl) inputEl.setSelectionRange(selectionIndex, selectionIndex);
    }, 0);
  };
}

export default FormulaInput;
