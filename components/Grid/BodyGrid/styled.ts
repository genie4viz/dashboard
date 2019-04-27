import { stores } from '@app/stores';
import { css } from 'emotion';

export const BodyGridWrapper = css`
  font-weight: bold;
  top: 0;
  z-index: 1;
  overflow: visible;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
  background-color: #f5f5f5;
  border-bottom: 1px solid hsl(202, 10%, 88%);
  width: 100%;
  left: -${stores.gridStore.bodyGridMarginLeft};
`;
