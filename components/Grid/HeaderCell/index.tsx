import { observer } from 'mobx-react';
import React from 'react';

import FieldDropdownButton from '@app/components/Field/DropdownButton';
import { stores } from '@app/stores';

import { ColumnTitle, Container, DropdownIcon } from './styled';

export interface IHeaderCellProps {
  rowIndex: number;
  columnIndex: number;
  key: string;
  style: React.CSSProperties;
}

@observer
class HeaderCell extends React.Component<IHeaderCellProps> {
  public onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // TODO: find way to declare this type.
    stores.gridStore.onSortColumnStart({
      columnId: e.target!.dataset!.columnid!,
      columnIndex: e.target!.dataset!.columnindex!,
    });
  };

  public handleDoubleClick = () => {
    const { columnIndex } = this.props;
    stores.gridStore.selectColumn(columnIndex);
  };

  public render() {
    const { rowIndex, columnIndex, style } = this.props;
    const column = stores.tableStore.getColumnByIndex(columnIndex);
    return (
      <Container
        onDragStart={this.onDragStart}
        onDoubleClick={this.handleDoubleClick}
        draggable={true}
        data-column-id={column.id}
        data-column-index={columnIndex}
        key={`c${columnIndex}-r${rowIndex}`}
        style={style}
      >
        <ColumnTitle>{column.name}</ColumnTitle>
        <FieldDropdownButton css={DropdownIcon} />
      </Container>
    );
  }
}

export default HeaderCell;
