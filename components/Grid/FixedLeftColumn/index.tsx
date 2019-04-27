import { observer } from 'mobx-react';
import React, { RefObject } from 'react';
import { Grid } from 'react-virtualized';

import { stores } from '@app/stores';
import { BodyCell } from '../BodyCell';
import { FixedLeftColumnWrapper } from './styled';

interface IFixedLeftColumnProps {
  setRef?: RefObject<any>;
  height: number;
}

@observer
export class FixedLeftColumn extends React.Component<IFixedLeftColumnProps> {
  public render() {
    const { height } = this.props;
    const {
      getColumnWidth,
      rowHeight,
      fixedColumnCount,
      fixedColumnsTotalWidth,
      overscanColumnCount,
      overscanRowCount,
    } = stores.gridStore;
    const { numRows } = stores.tableStore;
    return (
      <Grid
        containerStyle={{
          overflowY: 'hidden',
          overflowX: 'hidden',
        }}
        ref={this.props.setRef}
        overscanColumnCount={overscanColumnCount}
        overscanRowCount={overscanRowCount}
        cellRenderer={this._renderLeftSideCell}
        columnWidth={getColumnWidth}
        columnCount={fixedColumnCount}
        css={FixedLeftColumnWrapper}
        height={height}
        rowHeight={rowHeight}
        rowCount={numRows}
        width={fixedColumnsTotalWidth}
      />
    );
  }
  private _renderLeftSideCell = (props) => {
    const { key, style, columnIndex, rowIndex } = props;
    if (rowIndex >= stores.gridStore.fixedRowCount) {
      return <BodyCell key={key} columnIndex={columnIndex} rowIndex={rowIndex} style={style} />;
    }
  };
}
