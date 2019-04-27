import React from 'react';

import { Container, Donut, ISpinner } from './styled';

const Spinner: React.FC<ISpinner> = ({ color, size, strokeWidth }) => (
  <Container>
    <Donut strokeWidth={strokeWidth} size={size} color={color} />
  </Container>
);

export default Spinner;
