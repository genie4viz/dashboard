/**
 * Wrapper Component for table
 * which handles
 * @function selectRow
 * @function selectColumn
 * @function sortColumnOrder
 * @function sortRowOrder
 * @function hoverRow
 * @function hoverColumn
 * @function hoverOff
 */
import { css, cx } from 'emotion';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

import { stores } from '@app/stores';

import Dropdown from '@app/components/Dropdown';

const Wrapper = css`
  flex: 1 1 auto;
  height: 100%;
  max-height: 90vh;
  margin-left: 75px;

  scroll-behavior: smooth;
`;

const DropdownOptions = [
  {
    id: 'option1',
    titleId: 'dropdown.record.name.expandRecord',
  },
  {
    id: 'option2',
    titleId: 'dropdown.record.name.deleteRecord',
  },
];

interface ITableWrapper {
  onWheel: (e: any) => void;
}

@observer
export class TableWrapper extends React.Component<ITableWrapper> {
  @observable private isDropdownOpen: boolean = false;
  @observable private selectdRowId: string = '';
  @observable private mousePosition: { mouseX: number; mouseY: number } = { mouseX: 0, mouseY: 0 };

  public hoverOff = () => {
    stores.gridStore.hoveredRowIndex = undefined;
    stores.gridStore.hoveredColumnIndex = undefined;
  };

  public selectedRowsHighlightCss = () => {
    if (stores.gridStore.selectedRowIdRegistry.size === 0) return;
    const rules: string[] = [];
    stores.gridStore.selectedRowIdRegistry.forEach((_value, key) => {
      rules.push(`
          [data-row-id='${key}'] {
            .wrapper {
              background: rgba(127,219,255,0.4);
            }
          }
        `);
    });
    return rules.join('\n');
  };

  public selectedColumnsHighlightCss = () => {
    if (stores.gridStore.selectedColumnIdRegistry.size === 0) return;
    const rules: string[] = [];
    stores.gridStore.selectedColumnIdRegistry.forEach((_value, key) => {
      rules.push(`
          [data-column-id='${key}'] {
            .wrapper {
              background: rgba(127,219,255,0.4);
            }
          }
        `);
    });
    return rules.join('\n');
  };

  public sortRowOverHighlightCss = () => {
    const shouldSortRowOver = !!stores.gridStore.sortRowOver;
    if (shouldSortRowOver) {
      return `[data-row-index='${stores.gridStore.sortRowOver}'] {
                    .wrapper {
                      border-bottom: 2px solid darkblue;
                    }
                }`;
    }
  };

  public sortColumnOverHighlightCss = () => {
    const shouldSortColumnOver = !!stores.gridStore.sortColumnOver;
    if (shouldSortColumnOver) {
      return `[data-column-index='${stores.gridStore.sortColumnOver}'] {
                .wrapper {
                  border-right: 2px solid darkblue;
                }
              }`;
    }
  };

  public hoverRowCss = () => {
    const hoveredRowIndex = stores.gridStore.hoveredRowIndex;
    const shouldHoverRow = !!hoveredRowIndex || hoveredRowIndex === 0;
    if (shouldHoverRow) {
      return `[data-row-Index='${hoveredRowIndex}'] {
                .checkbox, .expandRow, .dragHandler {
                  display: block
                }

                .numberText {
                  display:none;
                }
              }`;
    }
  };

  public onSortColumnCss = () => {
    const shouldHighlightSortColumn = !!stores.gridStore.onSortColumnId;
    if (shouldHighlightSortColumn) {
      return `[data-column-id='${stores.gridStore.onSortColumnId}'] {
                .wrapper {
                  background: rgba(218, 223, 225, 1);
                }
              }`;
    }
  };

  public onSortRowCss = () => {
    const shouldHighlightSortRow = !!stores.gridStore.onSortRowId;
    if (shouldHighlightSortRow) {
      return `[data-row-id='${stores.gridStore.onSortRowId}'] {
                .wrapper {
                  background: rgba(218, 223, 225, 1);
                }
              }`;
    }
  };

  public onDragOver = (e) => {
    e.preventDefault();
    const columnIndex = e.target.dataset.columnindex;
    stores.gridStore.onSortColumnOver(columnIndex);
  };

  public onDrop = (e: React.DragEvent) => {
    if (stores.gridStore.onSortColumnId) {
      const newIndex = e.target.dataset.columnindex!;
      stores.gridStore.onSortColumnEnd(newIndex);
    }
    if (stores.gridStore.onSortRowId) {
      const newIndex = e.target.dataset.rowindex!;
      stores.gridStore.onSortRowEnd(newIndex);
    }
  };

  public onRightClick = (e: React.MouseEvent) => {
    let targetEl = e.target;
    if (!targetEl || !targetEl.dataset.rowId) {
      targetEl = e.target.closest('#static-cell-data');
    }

    if (targetEl && targetEl.dataset.rowId) {
      e.preventDefault();
      this.selectdRowId = targetEl.dataset.rowId;
      this.mousePosition = { mouseX: e.clientX, mouseY: e.clientY };
      this.onDropdownOpenState();
    }
  };

  public onDropdownOpenState = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
  };

  public onClickDropdownOption = (option) => {
    switch (option.id) {
      case 'option2': {
        console.log(this.selectdRowId);
        break;
      }
      default:
        break;
    }
    this.onDropdownOpenState();
  };

  public render() {
    return (
      <div
        onDragOver={this.onDragOver}
        onContextMenu={this.onRightClick}
        onDrop={this.onDrop}
        onWheel={this.props.onWheel}
        className={[
          Wrapper,
          css`
            ${this.selectedRowsHighlightCss()}
          `,
          css`
            ${this.selectedColumnsHighlightCss()}
          `,
          css`
            ${this.sortRowOverHighlightCss()}
          `,
          css`
            ${this.sortColumnOverHighlightCss()}
          `,
          css`
            ${this.hoverRowCss()}
          `,
          css`
            /* Dark grey bg for getting sorted  row or column */
            ${this.onSortColumnCss()}
          `,
          css`
            ${this.onSortRowCss()}
          `,
        ].join(' ')}
      >
        {this.props.children}
        {this.isDropdownOpen && (
          <Dropdown
            onClose={this.onDropdownOpenState}
            onClick={this.onClickDropdownOption}
            options={DropdownOptions}
            left={this.mousePosition.mouseX}
            top={this.mousePosition.mouseY}
          />
        )}
      </div>
    );
  }
}
