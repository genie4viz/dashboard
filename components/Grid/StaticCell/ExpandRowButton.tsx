import { css, cx } from 'emotion';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';

import ButtonIcon from '@app/components/Button/Icon';
import { glyphs } from '@app/components/Icon';
import RecordModal from '@app/components/Record/Modal';

export interface IExpandRowButtonProps {
  rowIndex: number;
}

@observer
class ExpandRowButton extends React.Component<IExpandRowButtonProps> {
  @observable private isRecordModalOpen: boolean = false;

  public render() {
    const { rowIndex } = this.props;
    return (
      <Fragment>
        <ButtonIcon
          iconProps={{ size: { width: 16, height: 16 }, icon: glyphs.EXPAND_RECORD }}
          onClick={this.handleClick}
          className={cx(
            'expandRow',
            css`
              display: none;
            `,
          )}
        />
        {this.isRecordModalOpen && (
          <RecordModal rowIndex={rowIndex} onClose={this.handleCloseRecord} />
        )}
      </Fragment>
    );
  }

  private handleCloseRecord = () => {
    this.isRecordModalOpen = !this.isRecordModalOpen;
  };

  private handleClick = () => {
    this.handleCloseRecord();
  };
}

export default ExpandRowButton;
