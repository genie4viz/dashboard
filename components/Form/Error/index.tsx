import styled from '@emotion/styled';
import React from 'react';

import { textEllipsis } from '@app/components/Shared';

export interface IFormError {
  error: string;
  isSmall?: boolean;
}

const FormError: React.FC<IFormError> = ({ error, isSmall }) => (
  <Container isSmall={isSmall}>{error}</Container>
);

const Container = styled.p<{ isSmall?: boolean }>`
  bottom: 3px;
  color: ${(props) => props.theme.color.red};
  font-size: ${(props) => (props.isSmall ? '12px' : '14px')};
  position: absolute;
  margin: 0;
  width: 100%;

  ${textEllipsis}
`;

export default FormError;
