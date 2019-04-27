import { ICellDataId, ICellPosition } from '@app/types';

export class Cell {
  /**
   *  private function for keeping cellKey's consistent.
   * @param {Object} ICellPosition
   */
  public static keyByPosition({ columnIndex, rowIndex }: ICellPosition): string {
    return `c${columnIndex}-r${rowIndex}`;
  }

  public static keyById({ columnId, rowId }: ICellDataId): string {
    return `c${columnId}-r${rowId}`;
  }
}
