import { css } from '@emotion/core';
import { FieldRenderProps } from 'react-final-form';

export interface IFieldOptions extends FieldRenderProps<HTMLElement> {
  className?: string;
}

export const FieldCSS = css`
  width: 264px;
  margin: 15px 0 15px 15px;
`;
