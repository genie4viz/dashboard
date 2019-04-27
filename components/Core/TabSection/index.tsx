import React from 'react';

import HeaderTab, { ITable } from './Tab';

import { stores } from '@app/stores';

import { Container, FakeBorder } from './styled';

export interface IProps {
  tables: ITable[];
}

const CoreTabSection: React.FC<IProps> = ({ tables }) => (
  <Container>
    <FakeBorder />
    {tables.map((table, index) => (
      <HeaderTab
        activeTab={stores.tableStore.activeTableId}
        onChangeActiveTab={() => {}}
        key={index}
        table={table}
      />
    ))}
  </Container>
);

export default CoreTabSection;
