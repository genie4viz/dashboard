import React from 'react';
import { Container, LeftSection, MidSection, RightSection } from './styled';

import ButtonIcon from '@app/components/Button/Icon';
import { glyphs } from '@app/components/Icon';
import { H2 } from '@app/components/Shared/Typescale';

export interface IHeaderProps {
  core: string;
}

const CoreHeader: React.FC<IHeaderProps> = ({ core }) => (
  <Container>
    <LeftSection>
      <ButtonIcon
        iconProps={{ size: { height: 40, width: 40 }, icon: glyphs.LOGO_REGULAR }}
        onClick={() => {
          /* Redirects user to go back */
        }}
      />
    </LeftSection>
    <MidSection>
      <H2>{core}</H2>
    </MidSection>
    <RightSection />
  </Container>
);

export default CoreHeader;
