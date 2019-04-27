import Link from 'next/link';
import React from 'react';

import Icon, { glyphs } from '@app/components/Icon';
import { GetWorkspaceCoresQuery_workspace_cores } from '@app/graphql/workspace/types/GetWorkspaceCoresQuery';
import { CORE_COLORS } from '@app/theme/color';

import DropdownButton from './DropdownButton';

import { Container, DropdownStyle, IconContainer, Name } from './styled';

export { GetWorkspaceCoresQuery_workspace_cores };

export interface ICoreListNav {
  className?: string;
  core: any;
}

const CoreListNav: React.FC<ICoreListNav> = ({ className, core }) => (
  <Container className={className}>
    <Link key={core.id} href={core.url}>
      <IconContainer color={CORE_COLORS[core.color]}>
        <Icon icon={glyphs[core.icon]} size={{ width: 48, height: 48 }} />
      </IconContainer>
    </Link>
    <DropdownButton css={DropdownStyle} />
    <Name>{core!.name}</Name>
  </Container>
);

export default CoreListNav;
