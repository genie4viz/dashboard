import { observer } from 'mobx-react';
import React, { RefObject } from 'react';
import { Grid, GridCellProps } from 'react-virtualized';

import { stores } from '@app/stores';

import AddColumn from '../AddColumn';
import HeaderCell from '../HeaderCell';
import { SortableGridStyle } from './styled';

export interface ISortableColumnProps {
  width: number;
  height: number;
  setRef?: RefObject<any>;
}

@observer
export class SortableColumn extends React.Component<ISortableColumnProps> {
  public render() {
    const { overscanColumnCount, overscanRowCount, rowHeight, getColumnWidth } = stores.gridStore;
    const { numColumns } = stores.tableStore;
    return (
      <Grid
        css={SortableGridStyle}
        ref={this.props.setRef}
        overscanColumnCount={overscanColumnCount}
        overscanRowCount={overscanRowCount}
        cellRenderer={this._renderHeaderCell}
        height={rowHeight}
        width={this.props.width}
        rowHeight={rowHeight}
        rowCount={1}
        columnCount={numColumns + 1}
        columnWidth={({ index }: { index: number }) =>
          index === numColumns ? 50 : getColumnWidth({ index })
        }
        drag={true}
      />
    );
  }

  private _renderHeaderCell = (props: GridCellProps): React.ReactNode => {
    const { key, style, columnIndex, rowIndex } = props;
    const { numColumns } = stores.tableStore;
    if (columnIndex === numColumns) {
      return <AddColumn style={style} />;
    }
    return <HeaderCell key={key} columnIndex={columnIndex} rowIndex={rowIndex} style={style} />;
  };
}
