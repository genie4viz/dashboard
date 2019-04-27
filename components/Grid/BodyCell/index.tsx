import { css, cx } from 'emotion';
import { IValueDidChange, observable, reaction, computed } from 'mobx';
import { Disposer, observer } from 'mobx-react';
import * as React from 'react';
import { GridCellProps } from 'react-virtualized';

import { getCellComponentByColumnType } from '@app/components/Grid/Cell';
import { stores } from '@app/stores';
import { ICellData, ICellState, IControlKeyEvent, KeyboardKeys } from '@app/types';
import { getEditorComponentByColumnType } from '../Editor';
import { CellWrapper, Cursor, Selected } from './styled';

export interface IBodyCellProps extends GridCellProps {
  columnIndex: number;
  rowIndex: number;
  key: string;
}

@observer
export class BodyCell extends React.Component<IBodyCellProps, {}> {
  public bodyCellRef: React.RefObject<HTMLDivElement>;

  @observable private cellData: ICellData = {};
  @observable private cellState: ICellState = {};
  @observable private edit: boolean = false;

  private cellDataDisposable: Disposer | undefined;
  private cellStateDisposable: Disposer | undefined;
  private _shouldReactToEnterUp = false;

  private keyboardListenerDisposer:
    | undefined
    | ((options?: boolean | EventListenerOptions | undefined) => void);

  private addKeyboardlisteners = reaction(
    () => this.edit,
    () => {
      if (this.edit) {
        this.keyboardListenerDisposer = stores.keyboardStore!.keyboard.onControlLayoutUp(
          (a: IControlKeyEvent) => {
            if (a.key === KeyboardKeys.ENTER) {
              if (this._shouldReactToEnterUp) {
                // TODO: Should now move if  this is the last cell
                // in the row.
                stores.gridStore.cursorMoveDownOneCell();
              }
              this._shouldReactToEnterUp = true;
            }
          },
        );
        return;
      }
      this.keyboardListenerDisposer!();
    },
  );

  private reactionToExitEdit = reaction(
    () => this.cellState!.cursor === true,
    () => {
      this.edit = false;
      this._shouldReactToEnterUp = false;
    },
  );

  private reactionToEnterEdit = reaction(
    () => this.shouldReactToEnterEdit(),
    () => {
      this.edit = true;
    },
  );

  constructor(props) {
    super(props);
    this.bodyCellRef = React.createRef();
  }

  public selectCell = () => {
    const { columnIndex, rowIndex } = this.props;

    if (!stores.keyboardStore!.isShiftDown) {
      stores.gridStore.setCursorPosition({
        columnIndex,
        rowIndex,
      });
    }

    stores.gridStore.setFillHandlePosition({
      columnIndex,
      rowIndex,
    });
  };

  public componentDidMount() {
    const { columnIndex, rowIndex } = this.props;
    const cellData = stores.tableStore.getCellByColumnAndRowIndex({
      columnIndex,
      rowIndex,
    });

    const cellState = stores.gridStore.getCellState({ columnIndex, rowIndex });

    this.cellDataDisposable = cellData.observe(({ newValue }: IValueDidChange<ICellData>) => {
      this.cellData = newValue;
    });

    this.cellStateDisposable = cellState.observe(({ newValue }: IValueDidChange<ICellState>) => {
      this.cellState = newValue;
    });

    this.cellData = cellData.get();
    this.cellState = cellState.get();
  }

  public componentWillUnmount() {
    this.cellDataDisposable!();
    this.cellStateDisposable!();
  }

  public render() {
    const { columnIndex, rowIndex, style } = this.props;
    const CellComponent = getCellComponentByColumnType(this.cellData!.type);
    const EditorComponent = getEditorComponentByColumnType(this.cellData!.type);
    return (
      <div
        ref={this.bodyCellRef}
        role={this.cellState!.cursor ? 'button' : 'wrapper'}
        onClick={this.selectCell}
        className={cx(
          CellWrapper,
          { [Selected]: this.cellState!.selected },
          { [Cursor]: this.cellState!.cursor },
        )}
        key={`InnerCell-c${columnIndex}-r${rowIndex}`}
        data-column-id={this.cellData!.columnId}
        data-row-id={this.cellData!.rowId}
        data-column-index={columnIndex}
        data-row-index={rowIndex}
        data-column-type={this.cellData!.type}
        style={{
          ...style,
        }}
        onMouseEnter={this.hoverOn}
        onMouseDown={this.onMouseDown}
        onMouseOver={this.onMouseOver}
      >
        <div
          className={cx(
            'wrapper',
            css`
              pointer-events: none;
            `,
          )}
        >
          {this.edit ? (
            <EditorComponent {...this.cellData} />
          ) : (
            <CellComponent {...this.cellData} />
          )}
        </div>
        {this.cellState!.fillHandle ? (
          <div
            className={css`
              width: 10px;
              height: 10px;
              background: red;
              border: 1px solid black;
            `}
          />
        ) : null}
      </div>
    );
  }

  private shouldReactToEnterEdit() {
    return stores.keyboardStore!.isEnterDown && this.cellState!.cursor && !this.edit;
  }

  private hoverOn = () => {
    const { columnIndex, rowIndex } = this.props;
    stores.gridStore.setHoveredCell({
      columnIndex,
      rowIndex,
    });
  };

  private onMouseDown = () => {
    const { columnIndex, rowIndex } = this.props;
    stores.gridStore.setCursorPosition({
      columnIndex,
      rowIndex,
    });
  };

  private onMouseOver = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      const { columnIndex, rowIndex } = this.props;
      stores.gridStore.setFillHandlePosition({
        columnIndex,
        rowIndex,
      });
    }
  };
}
