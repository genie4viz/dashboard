import React, { createRef, PureComponent } from 'react';
import { InjectedIntl, injectIntl } from 'react-intl';

import { SELECT_COLOR } from '@app/theme/color';

import ButtonIcon from '@app/components/Button/Icon';
import Icon, { glyphs } from '@app/components/Icon';

import { IFieldOptions } from '../../shared';

import { Color, Container, DragContainer, Input } from './styled';

export interface IOptionProps extends IFieldOptions {
  onRemove: (optionId: string) => void;
  index: number;
  intl: InjectedIntl;
}

// TODO: @Will drap option to sort
class Option extends PureComponent<IOptionProps> {
  private tabRef: React.RefObject<HTMLInputElement> = createRef();

  public componentDidMount() {
    if (this.tabRef.current) this.tabRef.current.focus();
    const { value, onChange } = this.props.input;
    if (!value.color) {
      const colors = Object.keys(SELECT_COLOR);
      onChange({
        ...value,
        color: colors[this.props.index % (colors.length - 1)],
      });
    }
  }

  public render() {
    const {
      input: { value, onChange },
      intl: { formatMessage },
      onRemove,
    } = this.props;
    return (
      <Container>
        <DragContainer>
          <Icon size={{ width: 15, height: 15 }} icon={glyphs.DRAG_INDICATOR} />
        </DragContainer>
        <Color color={SELECT_COLOR[value.color]} />
        <Input
          defaultValue={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder={formatMessage({
            id: 'form.field.options.empty',
          })}
        />
        <ButtonIcon
          css={{ width: 15, height: 15 }}
          iconProps={{ size: { width: 10, height: 10 }, icon: glyphs.REMOVE }}
          onClick={() => onRemove(value.id)}
        />
      </Container>
    );
  }
}

export default injectIntl(Option);
