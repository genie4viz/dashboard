import { stores } from '@app/stores';
import { observer } from 'mobx-react';
import React from 'react';

@observer
class SelectAll extends React.Component {
  public render() {
    const { selectAll, isAllSelected } = stores.gridStore;
    return (
      <div>
        {isAllSelected ? (
          <div onClick={() => selectAll(false)}> [X] </div>
        ) : (
          <div onClick={() => selectAll(true)}> [ ] </div>
        )}
      </div>
    );
  }
}

export default SelectAll;
