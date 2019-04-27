import React from 'react';

import { Button } from './styled';

export interface ITable {
  id: string;
  name: string;
}

interface IProps {
  activeTab?: string;
  onChangeActiveTab: (id: string) => void;
  table: ITable;
}

const TabSectionTab: React.FC<IProps> = ({ activeTab, onChangeActiveTab, table }) => (
  <Button
    activeTab={activeTab === table.id}
    onClick={(e: React.KeyboardEvent) => {
      e.preventDefault();
      if (activeTab !== table.id) {
        onChangeActiveTab(table.id);
      }
    }}
  >
    <span>{table.name}</span>
  </Button>
);

export default TabSectionTab;
