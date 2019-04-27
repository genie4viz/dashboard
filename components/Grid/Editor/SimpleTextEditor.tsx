import { css } from 'emotion';
import { get as getField } from 'lodash';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

import { stores } from '@app/stores';

import { IEditorProps } from '.';

@observer
export class SimpleTextEditor extends React.Component<IEditorProps> {
  @computed
  get isDirty() {
    return this.value !== getField(this.props, 'value.text');
  }
  @observable public value = getField(this.props, 'value.text', '');
  public inputRef: React.Ref<HTMLInputElement> = React.createRef();

  public componentDidMount() {
    this.inputRef!.current!.focus();
  }

  public componentWillUnmount() {
    if (!this.isDirty) {
      return;
    }
    const { columnId, rowId, type } = this.props;
    this.props.updateCell({
      columnId,
      rowId,
      coreId: stores.coreStore.activeCoreId!,
      tableId: stores.tableStore.activeTableId!,
      workspaceId: stores.workspaceStore.activeWorkspaceId!,
      value: {
        type,
        text: this.value,
      },
    });
  }

  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.value = e.target.value;
  };

  public render() {
    return (
      <div
        className={css`
          width: 100%;
          height: 100%;
          border: 2px solid ${this.isDirty ? 'red' : 'green'};
          input {
            height: 100%;
            width: 100%;
          }
        `}
      >
        <input
          ref={this.inputRef}
          onChange={this.onChange}
          value={this.value}
          placeholder="enter"
        />
      </div>
    );
  }
}
