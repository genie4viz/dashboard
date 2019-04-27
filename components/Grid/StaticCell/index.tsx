import { css } from 'emotion';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { ListRowProps } from 'react-virtualized';

import { stores } from '@app/stores';
import { IRowState } from '@app/types';
import ExpandRowButton from './ExpandRowButton';
import RowNumber from './RowNumber';

@observer
class StaticCell extends React.Component<ListRowProps> {
  @observable private rowState: IRowState = {};
  public componentDidMount() {
    const rowState = stores.gridStore.getRowState(this.props.index);

    this.rowState = rowState.observe(({ newValue }: IRowState) => {
      this.rowState = newValue;
    });

    this.rowState = rowState.get();
  }
  public render() {
    const rowId = stores.tableStore.rowIdsRegistry[this.props.index];
    const { index, style } = this.props;
    return (
      <div
        className={css`
          display: flex;
          align-items: center;
          z-index: 1000;
          cursor: move;
          border-bottom: 1px solid #d8d6d4;
          box-sizing: border-box;
          user-select: none;
        `}
        key={this.props.key}
        data-row-index={index}
        data-row-id={rowId}
        id="static-cell-data"
        style={style}
      >
        <RowNumber index={index} {...this.rowState} />
        <ExpandRowButton rowIndex={index} />
      </div>
    );
  }
}

const SortableStaticCell = SortableElement((props: ListRowProps) => <StaticCell {...props} />);

export default SortableStaticCell;
