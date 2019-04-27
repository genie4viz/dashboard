import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon, { glyphs } from '@app/components/Icon';

import { AddName, Container, IconContainer } from './styled';

interface IProps {
  onClick: () => void;
}

const CoreListAdd: React.FC<IProps> = ({ onClick }) => (
  <Container>
    <IconContainer onClick={onClick}>
      <Icon icon={glyphs.ADD} size={{ width: 40, height: 40 }} />
    </IconContainer>
    <AddName>
      <FormattedMessage id="core.list.addCore.title" />
    </AddName>
  </Container>
);

export default CoreListAdd;
