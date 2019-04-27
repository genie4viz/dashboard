import styled from '@emotion/styled';
import { css, cx } from 'emotion';
import { observer } from 'mobx-react';
import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

import { Span2 } from '@app/components/Shared/Typescale';

import Icon, { glyphs } from '@app/components/Icon';

import { stores } from '@app/stores';
import { IRowState } from '@app/types';

const Checkbox = styled.div`
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.grayDisabled};
  border-radius: 2px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  height: 16px;
  justify-content: center;
  outline: none;
  padding: 2px;
  width: 16px;

  &:focus {
    border-color: ${(props) => props.theme.color.blueLight};
  }
`;

export interface IRowNumber {
  index: number;
}

@observer
class RowNumber extends React.Component<IRowNumber & IRowState> {
  public render() {
    const { index, selected } = this.props;

    return (
      <div
        className={cx(css`
          width: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        `)}
      >
        <div
          className={cx(
            'dragHandler',
            css`
              display: none;
              position: absolute;
              left: 0px;
            `,
          )}
        >
          <Icon size={{ width: 16, height: 16 }} icon={glyphs.DRAG_INDICATOR} />
        </div>
        <Span2 className={cx('numberText')}>{index}</Span2>
        <div
          className={cx(
            'checkbox',
            css`
              display: none;
            `,
          )}
        >
          <Checkbox onClick={this.handleRowSelect}>
            {selected && <Icon size={{ width: 16, height: 16 }} icon={glyphs.CHECKBOX} />}
          </Checkbox>
        </div>
      </div>
    );
  }

  private handleRowSelect = () => {
    stores.gridStore.selectRow(this.props.index, !this.props.selected);
  };
}

export default RowNumber;
