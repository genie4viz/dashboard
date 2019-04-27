import React from 'react';

import CoreListAdd from './Add';
import CoreListItem from './Item';

import { H2 } from '@app/components/Shared/Typescale';

import { Container, ListStyle, TitleStyle } from './styled';

export interface ICoreList {
  cores: any[];
  onOpenCoreModal: () => void;
}

const CoreList: React.FC<ICoreList> = ({ cores, onOpenCoreModal }) => (
  <Container>
    <H2 css={TitleStyle}>Caminer</H2>
    {cores.map((core) => (
      <CoreListItem key={core.id} css={ListStyle} core={core} />
    ))}
    <CoreListAdd onClick={onOpenCoreModal} />
  </Container>
);

export default CoreList;
