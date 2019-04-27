import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';
import { Container, Content, Tab, TabsHeader } from './styled';

export interface ITabContainer {
  className?: string;
  children: (selectedIndex: number) => React.ReactNode;
  defaultIndex?: number;
  tabIds: string[];
}

const TabContainer: React.FC<ITabContainer> = ({ defaultIndex, children, className, tabIds }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex || 0);

  return (
    <Container className={className}>
      <TabsHeader>
        {tabIds.map((tabId, index) => (
          <Tab
            key={index}
            isSmall={true}
            onClick={() => setSelectedIndex(index)}
            isSelected={selectedIndex === index}
          >
            <FormattedMessage id={tabId} />
          </Tab>
        ))}
      </TabsHeader>
      <Content>{children && children(selectedIndex)}</Content>
    </Container>
  );
};

export default TabContainer;
