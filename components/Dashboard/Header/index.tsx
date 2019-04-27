import React from 'react';
import { Container, LeftSection, MidSection, RightSection, RightItem, TitleStyle, TextStyle, ButtonStyle } from './styled';

import ButtonIcon from '@app/components/Button/Icon';
import Button from '@app/components/Button';
import { glyphs } from '@app/components/Icon';
import { H2, P2 } from '@app/components/Shared/Typescale';

export interface IHeaderProps {
  dashboard: string;
  share: string;
  addBlock: string;
  onAddBlock: () => void;
}

const DashboardHeader: React.FC<IHeaderProps> = ({ dashboard, share, addBlock, onAddBlock }) => (
  <Container>
    <LeftSection>
      <ButtonIcon
        iconProps={{ size: { height: 40, width: 40 }, icon: glyphs.LOGO_REGULAR }}
        onClick={() => { }}
      />
    </LeftSection>
    <MidSection>
      <H2 css={TitleStyle}>{dashboard}</H2>
    </MidSection>
    <RightSection>
      <RightItem >
        <P2 css={TextStyle}>{share}</P2>
      </RightItem>
      <RightItem >
        <Button css={ButtonStyle} isSecondary={true} isSmall={true} onClick={onAddBlock}>
          {addBlock}
        </Button>
      </RightItem>
    </RightSection>
  </Container>
);

export default DashboardHeader;
