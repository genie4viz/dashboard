/**
 * Currently this file is WIP.
 */

import { css } from 'emotion';
import { throttle } from 'lodash';
import { observer } from 'mobx-react';
import * as React from 'react';
import { AutoSizer, ScrollParams, Size } from 'react-virtualized';

import { stores } from '@app/stores';
import AddRow from './AddRow';
import { BodyGrid } from './BodyGrid';
import { FixedLeftColumn } from './FixedLeftColumn';
import { FixedTopLeftGrid } from './FixedTopLeftGrid';
import { SortableColumn } from './SortableColumn';
import { SortableRow } from './SortableRow';
import { TableWrapper } from './TableWrapper';

@observer
class GridView extends React.Component {
  private bodyGridRef = React.createRef<any>();

  private fixedLeftColumnRef = React.createRef<any>();

  private sortableRowRef = React.createRef<any>();

  private sortableColumnRef = React.createRef<any>();
  constructor(props) {
    super(props);
    this.setScrollPosition = throttle(this.setScrollPosition.bind(this), 50);
  }

  public render() {
    const { rowHeight, bodyGridHeightMargin, fixedColumnsTotalWidth } = stores.gridStore;
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
          }}
        >
          <AddRow />
        </div>
        <TableWrapper onWheel={(e) => this.onWheel(e)}>
          <AutoSizer>
            {({ width, height }: Size) => (
              <>
                <div
                  className={css`
                    display: flex;
                    flex-flow: row nowrap;
                    width: ${width}px;
                    height: ${rowHeight}px;
                    z-index: 1000;
                  `}
                >
                  <FixedTopLeftGrid />
                  <SortableColumn
                    setRef={this.sortableColumnRef}
                    width={width - fixedColumnsTotalWidth}
                    height={height - bodyGridHeightMargin}
                  />
                </div>
                <div>
                  <div
                    className={css`
                      display: flex;
                      flex-flow: row nowrap;
                    `}
                  >
                    <SortableRow setRef={this.sortableRowRef} />
                    {stores.gridStore.fixedColumnCount > 0 ? (
                      <FixedLeftColumn
                        setRef={this.fixedLeftColumnRef}
                        height={height - bodyGridHeightMargin}
                      />
                    ) : null}

                    <BodyGrid
                      setRef={this.bodyGridRef}
                      setScrollPosition={this.setScrollPosition.bind(this)}
                      width={width - fixedColumnsTotalWidth}
                      height={height - bodyGridHeightMargin}
                    />
                  </div>
                </div>
              </>
            )}
          </AutoSizer>
        </TableWrapper>
      </React.Fragment>
    );
  }

  private onWheel(event: React.WheelEvent) {
    const maxTop =
      stores.gridStore.bodyGridTotalHeight -
      this.bodyGridRef.current.props.height +
      stores.gridStore.fixedRowsTotalHeight;
    const maxLeft = stores.gridStore.bodyGridTotalWidth - this.bodyGridRef.current.props.width;

    const scrollTop = Math.max(0, stores.gridStore.scrollTop + event.deltaY);

    if (scrollTop > maxTop) {
      return;
    }

    const scrollLeft = Math.max(0, stores.gridStore.scrollLeft + event.deltaX);

    if (scrollLeft > maxLeft) {
      return;
    }

    const scroll = { scrollTop, scrollLeft };
    this.setScrollPosition(scroll);
  }

  // TODO: Fix Keyword Navigation
  private setScrollPosition(scroll: Pick<ScrollParams, 'scrollTop' | 'scrollLeft'>) {
    stores.gridStore.onScroll(scroll);

    this.bodyGridRef.current.scrollToPosition(scroll);
    if (this.fixedLeftColumnRef.current) {
      this.fixedLeftColumnRef.current.scrollToPosition(scroll);
    }
    this.sortableRowRef.current.scrollContainer.scrollTop = scroll.scrollTop;
    this.sortableColumnRef.current.scrollToPosition(scroll);
  }
}

export default GridView;
