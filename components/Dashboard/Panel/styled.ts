import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { autorun } from 'mobx';

export const PanelDiv = styled.div<{ backgroundColor?: string; width?: string }>`
  background-color: ${(props) => props.backgroundColor || 'white'};
  border-radius: 16px;
  padding: 24px 32px;
  margin-top: 24px;
  width: ${(props) => props.width || '200px'};
`;
