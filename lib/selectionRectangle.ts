import { Cell } from '@app/utils/cell';
import { range } from 'lodash';

class SelectionRectangle {
  private _origin = { x: 0, y: 0 };
  private _selectedCells: string[] = [];

  public setOrigin(cellKey: string) {
    this._origin = this.cellKeyToCoordinate(cellKey);
  }

  public setArea(cellKey: string) {
    const secondPoint = this.cellKeyToCoordinate(cellKey);
    const min = {
      x: Math.min(this._origin.x, secondPoint.x),
      y: Math.min(this._origin.y, secondPoint.y),
    };
    const max = {
      x: Math.max(this._origin.x, secondPoint.x),
      y: Math.max(this._origin.y, secondPoint.y),
    };

    const Y = range(min.y, max.y + 1);
    const X = range(min.x, max.x + 1);

    X.forEach((x) => {
      Y.forEach((y) => {
        this._selectedCells.push(Cell.keyByPosition({ columnIndex: x, rowIndex: y }));
      });
    });
  }

  public get keys() {
    return this._selectedCells;
  }

  private cellKeyToCoordinate(cellKey: string) {
    const regex = /c(\d{1,})-r(\d{1,})/;
    const result = cellKey.match(regex);
    if (result === null) throw new Error('Bad Cell Key');
    return {
      y: parseInt(result[2], 10),
      x: parseInt(result[1], 10),
    };
  }
}

export { SelectionRectangle };
