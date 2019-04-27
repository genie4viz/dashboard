import { stores } from '@app/stores';
import { css } from '@emotion/core';

export const SortableGridStyle = (theme: any) => css`
  background-color: ${theme.color.grayBackground};
  border-bottom: 1px solid ${theme.color.grayDisabled};
  border-top: 1px solid ${theme.color.grayDisabled};
  overflow: scroll !important;
  overflow-y: hidden !important;
  overflow-x: hidden !important;

  left: -${stores.gridStore.bodyGridMarginLeft};
`;
