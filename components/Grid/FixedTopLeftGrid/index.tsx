import { observer } from 'mobx-react';
import React, { RefObject } from 'react';
import { Grid } from 'react-virtualized';

import { stores } from '@app/stores';

import HeaderCell from '../HeaderCell';
import SelectAll from '../SelectAll';
import { FixedTopLeftGridStyle } from './styled';

interface IFixedLeftColumnProps {
  setRef?: RefObject<any>;
}

@observer
export class FixedTopLeftGrid extends React.Component<IFixedLeftColumnProps> {
  public render() {
    const {
      getColumnWidth,
      rowHeight,
      fixedColumnCount,
      fixedColumnsTotalWidth,
      overscanColumnCount,
      overscanRowCount,
    } = stores.gridStore;
    return (
      <>
        <div
          style={{
            position: 'absolute',
            left: '-50px',
            height: rowHeight,
          }}
        >
          <SelectAll />
        </div>
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
          css={FixedTopLeftGridStyle}
          height={rowHeight}
          rowHeight={rowHeight}
          rowCount={1}
          width={fixedColumnsTotalWidth}
        />
      </>
    );
  }
  private _renderLeftSideCell = (props) => {
    const { key, style, columnIndex, rowIndex } = props;
    return <HeaderCell key={key} columnIndex={columnIndex} rowIndex={rowIndex} style={style} />;
  };
}
