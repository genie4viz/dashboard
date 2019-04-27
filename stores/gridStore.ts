import { range } from 'lodash';
import { action, autorun, computed, observable } from 'mobx';
import { ScrollParams } from 'react-virtualized';

import { SelectionRectangle } from '@app/lib/selectionRectangle';
import { stores } from '@app/stores';
import { ICellPosition, ICellState, IRowState } from '@app/types';
import { IColumnSortStart, IRowSortStart } from '@app/types/store';
import { Cell } from '@app/utils/cell';

const initialCellState: ICellState = {
  selected: false,
  cursor: false,
  fillHandle: false,
};

export class GridStore {
  /**
   * @returns {boolean} allRows selected or not.
   */
  @computed
  get isAllSelected(): boolean {
    return stores.tableStore.numRows === this.selectedRowIdRegistry.size;
  }

  /**
   * helper computed value for decide is it area or not.
   * @return {boolean}
   */
  @computed
  get isSelectRectangleArea(): boolean {
    return this.cursorPointer !== this.fillHandlePointer;
  }

  /**
   * cursorPointer we only want to have one cursor in the Grid.
   * We use this variable in @function setCursorPosition.
   */
  @computed
  get cursorPointer() {
    return Cell.keyByPosition({
      columnIndex: this.cursorColumn,
      rowIndex: this.cursorRow,
    });
  }

  /**
   * fillHandle acts like second point for area selection
   * @returns {string} fillHandlePosition as key value
   */
  @computed
  get fillHandlePointer() {
    return Cell.keyByPosition({
      columnIndex: this.fillHandleColumn,
      rowIndex: this.fillHandleRow,
    });
  }

  /**
   * auto computed array of selected keys
   * @returns {Array<string>} returns selected cellKeys array
   */
  @computed
  get selectedCells() {
    const selectedCells = new SelectionRectangle();
    selectedCells.setOrigin(this.cursorPointer);
    selectedCells.setArea(this.fillHandlePointer);
    return selectedCells.keys;
  }

  @computed
  public get rowHeight(): number {
    return 41;
  }

  @computed
  public get bodyGridHeightMargin(): number {
    return this.fixedRowCount * this.rowHeight;
  }

  @computed
  public get fixedColumnsTotalWidth(): number {
    const fixedColumnIndexes = range(0, this.fixedColumnCount);
    return fixedColumnIndexes.reduce((prev, columnIndex) => {
      return prev + this.getColumnWidth({ index: columnIndex });
    }, 0);
  }

  @computed
  public get bodyGridMarginLeft(): string {
    return `${this.fixedColumnsTotalWidth}px`;
  }

  @computed
  public get fixedRowsTotalHeight(): number {
    return this.fixedRowCount * this.rowHeight;
  }

  @computed
  public get bodyGridTotalHeight(): number {
    return stores.gridStore.rowHeight * stores.tableStore.numRows;
  }

  @computed
  public get bodyGridTotalWidth(): number {
    const allColumnIndexes = range(0, stores.tableStore.numColumns);
    return allColumnIndexes.reduce((prev, columnIndex) => {
      return prev + this.getColumnWidth({ index: columnIndex });
    }, 0);
  }

  /**
   * reaction of if isSelectRectangleArea it's creates sideEffect. (literally selects them)
   */
  public selectedCellsChanged = autorun(() => {
    if (this.isSelectRectangleArea) {
      this.selectedRowIdRegistry.clear();
      this.selectedColumnIdRegistry.clear();
      this.cellStateMap.clear();

      this.selectedCells.map((k) => this.selectCell(k));
    }
  });

  @observable public overscanColumnCount: number = 20;
  @observable public overscanRowCount: number = 10;

  // Fixed Column & Row counts.
  @observable public fixedColumnCount: number = 1;
  @observable public fixedRowCount: number = 0;

  /**
   * Cell Map where we keep state of the cells which has the type of @ICellState
   */
  @observable public cellStateMap = observable.map<string, ICellState>();

  /**
   * Helper registry for keeping track of selected rows.
   */
  @observable public selectedRowIdRegistry = observable.map<string, boolean>();

  /**
   * Helper registry for keeping track of selected columns.
   */
  @observable
  public selectedColumnIdRegistry = observable.map<string, boolean>();

  /**
   *  Used for @component Grid to know Column Cursor at.
   */
  @observable public cursorColumn: number = 0;

  /**
   *  Used for @component Grid to know Row Cursor at.
   */
  @observable public cursorRow: number = 0;

  /**
   *  Used for @component Grid to know Column fillHandle at.
   */
  @observable public fillHandleColumn: number = 0;

  /**
   *  Used for @component Grid to know Row fillHandle at.
   */
  @observable public fillHandleRow: number = 0;

  /**
   * for ScrollSync
   * TODO: this logic needs refactor
   */
  @observable public scrollTop: number = 0;
  @observable public scrollLeft: number = 0;

  /**
   * Sort helpers for Row
   */
  @observable public sortRowOver: number | undefined;
  @observable public onSortRowId: string | undefined;
  @observable public onSortRowIndex: number | undefined;

  /**
   * Sort helpers for Column
   */
  @observable public sortColumnOver: number | undefined;
  @observable public onSortColumnId: string | undefined;
  @observable public onSortColumnIndex: number | undefined;

  /**
   * helper registry for now which row and Column mouse is hovering.
   */
  @observable public hoveredRowIndex: number | undefined;
  @observable public hoveredColumnIndex: number | undefined;

  /**
   * reaction for if fillHandlePointer changes it's creates sideEffect updates that cell.
   */
  private placeFillHandle = autorun(() => {
    if (this.cellStateMap.has(this.fillHandlePointer)) {
      this.cellStateMap.get(this.fillHandlePointer)!.fillHandle = true;
    }
  });

  /**
   * reaction for if fillHandlePointer changes it's creates sideEffect updates that cell.
   */
  private placeCursor = autorun(() => {
    if (this.cellStateMap.has(this.cursorPointer)) {
      this.cellStateMap.get(this.cursorPointer)!.cursor = true;
    }
  });

  @action.bound
  public setHoveredCell({ rowIndex, columnIndex }: ICellPosition) {
    this.hoveredColumnIndex = columnIndex;
    this.hoveredRowIndex = rowIndex;
  }

  @action.bound
  public getColumnWidth({ index }: { index: number }) {
    // TODO: use tableStore here.
    return 75;
  }

  /**
   * helper function
   * for keep track of which row is begin sorted.
   * @param {IRowSortStart}
   */
  @action.bound
  public onSortRowStart({ rowId, rowIndex }: IRowSortStart) {
    this.onSortRowId = rowId;
    this.onSortRowIndex = rowIndex;
  }

  /**
   * helper function
   * for highlight which row it's gonna be highlighted
   * @param rowIndex
   */
  @action.bound
  public onSortRowOver(rowIndex: number) {
    this.sortRowOver = rowIndex;
  }

  /**
   * it's called once sortRow is complete.
   * TODO: trigger a mutation in here.
   * @param newIndex
   */
  @action.bound
  public onSortRowEnd(newIndex: number) {
    const params = {
      newIndex,
      targetRow: stores.gridStore.onSortRowId,
      oldIndex: stores.gridStore.onSortRowIndex,
    };
    // tslint:disable-next-line: no-console
    console.log('Row Sort order changed', params);
    // TODO: swap sort order.
    this.sortRowOver = undefined;
    this.onSortRowId = undefined;
  }

  /**
   * helper function
   * for keep track of which column is begin sorted.
   * @param {IColumnSortStart}
   */
  @action.bound
  public onSortColumnStart({ columnIndex, columnId }: IColumnSortStart) {
    this.onSortColumnId = columnId;
    this.onSortColumnIndex = columnIndex;
  }

  /**
   * helper function
   * for highlight column row it's gonna be highlighted
   * @param columnIndex
   */
  @action.bound
  public onSortColumnOver(columnIndex: number) {
    this.sortColumnOver = columnIndex;
  }

  /**
   * it's called once sortColumn is complete.
   * TODO: trigger a mutation in here.
   * @param newIndex
   */
  @action.bound
  public onSortColumnEnd(newIndex: number) {
    const params = {
      newIndex,
      targetColumn: stores.gridStore.onSortColumnId,
      oldIndex: stores.gridStore.onSortColumnIndex,
    };
    // TODO: swap sort order.
    // tslint:disable-next-line: no-console
    console.log('Column Sort order changed', params);

    this.sortColumnOver = undefined;
    this.onSortColumnId = undefined;
  }

  /**
   * TODO: this logic might need refactor for ScrollSync
   * @param params
   */
  @action.bound
  public onScroll(params: Pick<ScrollParams, 'scrollTop' | 'scrollLeft'>) {
    this.scrollLeft = params.scrollLeft;
    this.scrollTop = params.scrollTop;
  }

  /**
   *  Selects all the cells in giving rowIndex
   * TODO: select Range of Rows if shift is down.
   * @param rowIndex number
   */
  @action.bound
  public selectRow(rowIndex: number, state: boolean = true) {
    this.selectedColumnIdRegistry.clear();
    const rowId = stores.tableStore.getRowIdByIndex(rowIndex);
    if (!state) {
      this.selectedRowIdRegistry.delete(rowId);
      return;
    }
    this.selectedRowIdRegistry.set(rowId, state);
  }

  /**
   * function for selecting all the rows.
   * the reason we don't cell by cell is to improve performance.
   * there's limited amount of actions are avaible when all the cells selected (delete, ? )
   * @param state
   */
  @action.bound
  public selectAll(state: boolean = true) {
    if (!state) {
      this.selectedRowIdRegistry.clear();
      return;
    }

    const allRows = range(0, stores.tableStore.numRows).map((index) =>
      stores.tableStore.getRowIdByIndex(index),
    );

    allRows.forEach((rowKey) => {
      this.selectedRowIdRegistry.set(rowKey, state);
    });
  }

  /**
   * Selects all the cells in giving ColumnIndex
   * @param columnIndex number
   */
  @action.bound
  public selectColumn(columnIndex: number, state: boolean = true) {
    this.selectedRowIdRegistry.clear();
    this.selectedColumnIdRegistry.clear();

    if (stores.keyboardStore!.isShiftDown) {
      const columnRange = {
        min: Math.min(stores.gridStore.cursorColumn, columnIndex),
        max: Math.max(stores.gridStore.cursorColumn, columnIndex),
      };

      _.range(columnRange.min, columnRange.max + 1).map((toBeSelectedIndex) => {
        const toBeSelectedcolumnId = stores.tableStore.getColumnIdByIndex(toBeSelectedIndex);
        this.selectedColumnIdRegistry.set(toBeSelectedcolumnId, state);
      });
      return;
    }
    const columnId = stores.tableStore.getColumnIdByIndex(columnIndex);
    if (!state) {
      this.selectedColumnIdRegistry.delete(columnId);
      return;
    }
    this.selectedColumnIdRegistry.set(columnId, state);
  }

  /**
   * Selects the cell
   * @param {Object} ICellPosition
   */
  @action.bound
  public selectCellHandler({ columnIndex, rowIndex }: ICellPosition): void {
    // cleanSelectedRows.
    this.selectedRowIdRegistry.clear();
    this.selectedColumnIdRegistry.clear();

    this.cellStateMap.clear();

    const cellKey = Cell.keyByPosition({ columnIndex, rowIndex });

    this.selectCell(cellKey);
  }

  @action.bound
  public selectCell(cellKey: string, state: boolean = true) {
    // Get Previous State of the cell.
    let cellState: ICellState | undefined;
    cellState = this.cellStateMap.get(cellKey);
    // if doesn't have set initial state
    if (cellState === undefined) {
      cellState = initialCellState;
    }

    // if the cell is alreay selected it will unselect.
    this.cellStateMap.set(cellKey, {
      ...cellState,
      selected: state,
    });
  }

  /**
   * Set Cursor Position this function both trigger by keyboard & Mouse click event
   * @param {Object} ScrollIndices
   */
  @action.bound
  public setCursorPosition(position: ICellPosition) {
    if (!stores.keyboardStore!.isShiftDown) {
      // if shift is not down change the position of cursor and fillHandle.
      this.cursorColumn = position.columnIndex;
      this.cursorRow = position.rowIndex;
    }

    // if shift is down only move fillHandle
    this.setFillHandlePosition({
      ...position,
    });

    this.selectCellHandler({
      ...position,
    });
  }

  @action.bound
  public cursorMoveDownOneCell() {
    this.setCursorPosition({
      columnIndex: this.cursorColumn,
      rowIndex: this.cursorRow + 1,
    });
  }

  /**
   * sets position of fillHandler
   * @param position
   */
  @action.bound
  public setFillHandlePosition(position: ICellPosition) {
    this.fillHandleColumn = position.columnIndex;
    this.fillHandleRow = position.rowIndex;
  }

  /**
   *  computed value for getting cellState  used in @component BodyCell
   * @param {Object} ICellPosition
   */
  public getCellState(position: ICellPosition) {
    return computed(
      (): ICellState => {
        const cellState = this.cellStateMap.get(Cell.keyByPosition(position));
        if (cellState !== undefined) {
          return {
            ...cellState,
          };
        }
        return initialCellState;
      },
    );
  }

  /**
   * return row state.
   * @param rowIndex
   */
  public getRowState(rowIndex: number) {
    return computed(
      (): IRowState => {
        const rowId = stores.tableStore.getRowIdByIndex(rowIndex);
        return {
          selected: this.selectedRowIdRegistry.get(rowId) || false,
        };
      },
    );
  }
}
