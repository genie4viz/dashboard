import { stores } from '@app/stores';
import { observer } from 'mobx-react';
import React, { RefObject } from 'react';
import { ArrowKeyStepper, Grid, ScrollIndices, ScrollParams } from 'react-virtualized';

import { BodyCell } from '../BodyCell';
import { BodyGridWrapper } from './styled';

interface IBodyGridProps {
  width: number;
  height: number;
  setRef?: RefObject<any>;
  setScrollPosition: (pos: Pick<ScrollParams, 'scrollTop' | 'scrollLeft'>) => void;
}

@observer
export class BodyGrid extends React.Component<IBodyGridProps> {
  public render() {
    const { width, height } = this.props;
    const {
      overscanColumnCount,
      overscanRowCount,
      getColumnWidth,
      rowHeight,
      fillHandleColumn,
      fillHandleRow,
    } = stores.gridStore;
    const { numColumns, numRows } = stores.tableStore;
    return (
      <ArrowKeyStepper
        columnCount={numColumns}
        rowCount={numRows}
        isControlled={true}
        onScrollToChange={(cursorPosition: ScrollIndices) => this.setCursorPosition(cursorPosition)}
        mode="cells"
        scrollToColumn={fillHandleColumn}
        scrollToRow={fillHandleRow}
      >
        {({ onSectionRendered }) => {
          return (
            <div
              style={{
                height,
                width,
              }}
            >
              <Grid
                ref={this.props.setRef}
                className={BodyGridWrapper}
                columnWidth={getColumnWidth}
                columnCount={numColumns}
                estimatedColumnSize={3}
                estimatedRowSize={3}
                height={height}
                scrollToColumn={fillHandleColumn}
                scrollToRow={fillHandleRow}
                onSectionRendered={onSectionRendered}
                overscanColumnCount={overscanColumnCount}
                overscanRowCount={overscanRowCount}
                cellRenderer={this._renderBodyCell}
                rowHeight={rowHeight}
                rowCount={numRows}
                width={width}
              />
            </div>
          );
        }}
      </ArrowKeyStepper>
    );
  }

  private _renderBodyCell = (props) => {
    if (props.columnIndex < stores.gridStore.fixedColumnCount) {
      return;
    }

    const { key, columnIndex, rowIndex, style, isVisible } = props;
    return <BodyCell key={key} columnIndex={columnIndex} rowIndex={rowIndex} style={style} />;
  };

  private setCursorPosition(position: ScrollIndices) {
    if (!stores.keyboardStore!.isShiftDown) {
      stores.gridStore.setCursorPosition({
        columnIndex: position.scrollToColumn,
        rowIndex: position.scrollToRow,
      });
    }

    stores.gridStore.setFillHandlePosition({
      columnIndex: position.scrollToColumn,
      rowIndex: position.scrollToRow,
    });

    const scrollTop = position.scrollToRow * stores.gridStore.rowHeight;

    this.props.setScrollPosition({
      scrollTop,
      scrollLeft: 0,
    });
  }
}
