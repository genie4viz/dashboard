import { textEllipsis } from '@app/components/Shared';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { Span2 } from '@app/components/Shared/Typescale';

export const Container = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.color.grayBackground};
  border: 1px solid ${(props) => props.theme.color.grayDisabled};
  border-top: none;
  border-right: none;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  padding: 0 3px 0 8px;
`;

export const ColumnTitle = styled(Span2)`
  color: ${(props) => props.theme.color.grayText};
  flex: 1;
  width: 100%;

  ${textEllipsis}
`;

export const DropdownIcon = css`
  height: 20px;
  width: 20px;
`;
