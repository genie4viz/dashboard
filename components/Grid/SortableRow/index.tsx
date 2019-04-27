import { observer } from 'mobx-react';
import React, { RefObject } from 'react';
import { SortableContainer, SortEnd, SortOver, SortStart } from 'react-sortable-hoc';
import { AutoSizer, List, ListRowProps, Size } from 'react-virtualized';

import { stores } from '@app/stores';
import StaticCell from '../StaticCell';
import { LeftSideGridContainer, SortableRowWrapper } from './styled';

const SortableList = SortableContainer(List);

interface ISortableRowProps {
  setRef?: RefObject<any>;
}

@observer
export class SortableRow extends React.Component<ISortableRowProps> {
  private columnWidth = 75; // for static cell only.

  public render() {
    const { overscanColumnCount, overscanRowCount, rowHeight } = stores.gridStore;
    const { numRows } = stores.tableStore;
    return (
      <div
        className={LeftSideGridContainer}
        style={{
          position: 'absolute',
          left: '-75px',
          top: rowHeight,
          height: '100%',
        }}
      >
        <AutoSizer>
          {({ height }: Size) => (
            <SortableList
              ref={this.props.setRef}
              overscanColumnCount={overscanColumnCount}
              overscanRowCount={overscanRowCount}
              onSortStart={this.onSortStart}
              onSortEnd={this.onSortEnd}
              onSortOver={this.onSortOver}
              useDragHandle={true}
              rowRenderer={this._renderStaticCell}
              columnWidth={this.columnWidth}
              columnCount={1}
              className={SortableRowWrapper}
              height={height}
              rowHeight={rowHeight}
              rowCount={numRows}
              width={this.columnWidth}
            />
          )}
        </AutoSizer>
      </div>
    );
  }

  private onSortStart = (params: SortStart) => {
    stores.gridStore.onSortRowStart({
      rowId: params.node.dataset.rowid,
      rowIndex: params.node.dataset.rowindex,
    });
  };

  private onSortEnd = (params: SortEnd) => {
    stores.gridStore.onSortRowEnd(params.newIndex);
  };

  private onSortOver = (params: SortOver) => {
    const { newIndex } = params;
    stores.gridStore.onSortRowOver(newIndex);
  };

  private _renderStaticCell = (props: ListRowProps) => {
    return <StaticCell {...props} />;
  };
}
