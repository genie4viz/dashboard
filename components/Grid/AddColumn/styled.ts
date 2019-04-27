import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const Container = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.color.grayBackground};
  border: 1px solid ${(props) => props.theme.color.grayDisabled};
  border-top: none;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

export const ButtonIconStyle = css`
  padding: 5px;
  width: 100%;
  height: 100%;
`;

export const IconStyle = css`
  color: #3f66f3;
`;
