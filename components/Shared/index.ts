import { css } from '@emotion/core';

export const textEllipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const textShared = (props: any) => css`
  color: ${props.theme.color.grayText};
  font-size: ${props.isSmall ? '14px' : '16px'};
`;
