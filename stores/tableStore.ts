/**
 * This is the store where we normalized fetched data.
 */

import { action, computed, observable, reaction } from 'mobx';

import {
  TableQuery_table,
  TableQuery_table_tableData_rows,
  TableQuery_table_tableData_rows_cells,
  TableQuery_table_viewDatas,
  TableQuery_table_viewDatas_columns,
} from '@app/graphql/table/types/TableQuery';
import { ICellData, ICellPosition } from '@app/types';
import { IInitilizeTablesParams } from '@app/types/store';
import { Cell } from '@app/utils/cell';

export class TableStore {
  /**
   * @returns colums for active Table
   */
  @computed
  get columns() {
    const activeViewId = this.activeViewId;
    return this.viewsRegistry.get(activeViewId!)!.columns;
  }

  /**
   * @returns rows for active Table
   */
  @computed
  get rows() {
    const activeTableId = this.activeTableId;
    return this.tablesRegistry.get(activeTableId!)!.tableData.rows;
  }

  /**
   * @returns table list
   */
  @computed
  get table() {
    const activeTableId = this.activeTableId;
    return this.tablesRegistry.get(activeTableId!);
  }

  @computed
  get view() {
    const activeViewId = this.activeViewId;
    return this.viewsRegistry.get(activeViewId!);
  }

  /**
   * @returns the row size for initilizing the GridView
   */
  @computed
  get numRows(): number {
    return this.rowIdsRegistry.length;
  }

  /**
   *  @returns the column size for initilizing the GridView
   */
  @computed
  get numColumns(): number {
    return this.columnIdsRegistry.length;
  }

  // for keeping data.
  @observable
  public tablesRegistry = observable.map<string, TableQuery_table>();
  @observable
  public viewsRegistry = observable.map<string, TableQuery_table_viewDatas>();
  @observable
  public rowsRegistry = observable.map<string, TableQuery_table_tableData_rows>();
  @observable
  public columnsRegistry = observable.map<string, TableQuery_table_viewDatas_columns>();
  @observable
  public cellDataMap = observable.map<string, ICellData>();

  // for easy access from cellRenderer.
  @observable public tableIdsRegistry: string[] = [];
  @observable public viewIdsRegistry: string[] = [];
  @observable public rowIdsRegistry: string[] = [];
  @observable public columnIdsRegistry: string[] = [];

  /**
   * active table Id for current State
   */
  @observable public activeTableId: string | undefined;

  /**
   *
   * Active View Id for current State
   */
  @observable public activeViewId: string | undefined;

  /**
   * when activeTable Changes it's sets Views
   */
  private reactToTableChange = reaction(
    () => this.activeTableId,
    () => {
      this.initilizeViews();
    },
  );

  /**
   * when activeView change it's sets the columns and rows
   */
  private reactToViewChange = reaction(
    () => this.activeViewId,
    () => {
      this.initilizeColumns();
      this.initilizeRows();
      this.initilizeCells();
    },
  );

  /**
   * Gets cell data for that specific column & row.
   * @param {Object} ICellPosition
   * @returns void
   */
  public getCellByColumnAndRowIndex({ rowIndex, columnIndex }: ICellPosition) {
    return computed(
      (): ICellData => {
        const columnId: string = this.getColumnIdByIndex(columnIndex);
        const rowId = this.getRowIdByIndex(rowIndex);

        const cellKey = Cell.keyById({ columnId, rowId });
        if (this.cellDataMap.has(cellKey)) {
          return this.cellDataMap.get(cellKey)!;
        }

        return {
          columnId,
          rowId,
          type: this.columnsRegistry.get(columnId)!.type,
          value: null,
        };
      },
    );
  }

  /**
   * gets ColumnIdby index
   * @param {number} Index
   */
  public getColumnIdByIndex(index: number) {
    const columnId = this.columnIdsRegistry[index];
    return columnId;
  }

  public getColumnByIndex(columnIndex: number): TableQuery_table_viewDatas_columns {
    const columnId = this.getColumnIdByIndex(columnIndex);
    return this.columnsRegistry.get(columnId)!;
  }

  public getColumnById(columnId: string): TableQuery_table_viewDatas_columns {
    return this.columnsRegistry.get(columnId)!;
  }

  /**
   * get Row by Index
   * @param {number} index
   */
  public getRowIdByIndex(index: number) {
    const rowId = this.rowIdsRegistry[index];
    return rowId;
  }

  public getRowByIndex(rowIndex: number) {
    const rowId = this.getRowIdByIndex(rowIndex);
    return this.rowsRegistry.get(rowId);
  }

  /**
   * Initilizes the tableStore via normalizing the fetching data.
   */
  @action.bound
  public initilize({ table, tableId, viewId }: IInitilizeTablesParams) {
    this.activeTableId = tableId;
    this.activeViewId = viewId;
    this.initilizeTables([table]);
  }

  /**
   *
   * @param {Array.<TableQuery_table>} tableDatas
   */
  @action.bound
  public initilizeTables(tables: TableQuery_table[]) {
    tables.forEach((table) => {
      this.tablesRegistry.set(table.id, table);
      this.tableIdsRegistry.push(table.id);
    });

    this.initilizeRows();
    this.initilizeViews();
  }

  /**
   * @param {Array.<TableQuery_table_tableData_rows>} rows
   */
  @action.bound
  public initilizeRows() {
    // flush old data
    this.rowIdsRegistry = [];
    this.rowsRegistry.clear();

    this.rows.forEach((row) => {
      this.rowsRegistry.set(row!.id, row!);
      // we push id of the row in registry for know the index of that row.
      this.rowIdsRegistry.push(row!.id);
    });
  }

  /**
   * initilizes the Views
   * @param {TableQuery_table} table
   * @returns void
   */
  @action.bound
  public initilizeViews() {
    // flush old data
    this.viewIdsRegistry = [];
    this.viewsRegistry.clear();

    const views = this.table!.viewDatas;
    views.forEach((view) => {
      this.viewsRegistry.set(view!.id, view!);
      this.viewIdsRegistry.push(view!.id);
    });
    this.initilizeColumns();
  }

  /**
   * Initilize Columns
   * @param {Array.TableQuery_table_viewDatas_columns} columns
   */
  @action.bound
  public initilizeColumns() {
    // flush old data.
    this.columnsRegistry.clear();
    this.columnIdsRegistry = [];

    const columns = this.view!.columns;

    columns!.forEach((column) => {
      this.columnsRegistry.set(column!.id, column!);
      // we push id of the row in registry for know the index of that column.
      this.columnIdsRegistry.push(column!.id);
    });
  }

  @action.bound
  private initilizeCells() {
    // flush old data.
    this.cellDataMap.clear();

    const rows = this.rows;
    rows.forEach((row: TableQuery_table_tableData_rows | null) => {
      row!.cells.forEach((cell: TableQuery_table_tableData_rows_cells | null) => {
        const cellKey = Cell.keyById({
          columnId: cell!.columnId,
          rowId: row!.id,
        });
        this.cellDataMap.set(cellKey, {
          columnId: cell!.columnId,
          rowId: row!.id,
          type: this.columnsRegistry.get(cell!.columnId)!.type,
          value: cell!.value,
        });
      });
    });
  }
}
