import { css } from 'emotion';

export const CellWrapper = css`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  outline: none;
  top: 0;
  overflow: visible;
  border-left-color: #f3f3f3;
  user-select: none;

  background-color: #ffffff;
  font-weight: normal;
  border-bottom: 1px solid red;
  transition: 0.2s;

  .wrapper {
    width: 100%;
    height: 100%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    border-left: 1px solid hsl(202, 10%, 88%);
    border-right: none;
    border-top: none;
  }
`;

export const Selected = css`
  background: rgba(127, 219, 255, 0.4);
`;

export const Cursor = css`
  border-top: 2px solid blue;
  border-right: 2px solid blue;
  border-bottom: 2px solid blue;
  border-left: 2px solid blue;
`;
