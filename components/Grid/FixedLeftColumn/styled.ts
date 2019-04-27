import { stores } from '@app/stores';
import { css } from 'emotion';

export const FixedLeftColumnWrapper = css`
  border-right: 2px solid #aaa;
  background-color: #f7f7f7;

  overflow: scroll !important;
  overflow-y: hidden !important;
  overflow-x: hidden !important;

  flex: 0 0 75px;
  z-index: 10;
  margin-top: -${stores.gridStore.fixedRowsTotalHeight}px;
`;
