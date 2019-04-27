import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { textEllipsis } from '@app/components/Shared';

export const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  min-width: 900px;
`;

export const TitleStyle = css`
  width: 100%;
  margin-bottom: 40px;

  ${textEllipsis}
`;

export const ListStyle = css`
  margin: 0 84px 40px 0px;
`;
