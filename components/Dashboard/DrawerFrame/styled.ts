import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const Container = styled.div`
  min-height: 100vh;
  padding: 0 40px;

  background-color: ${(props) => props.theme.color.grayBackground};
`;

export const ModalWrapperStyle = css`
  position: absolute;
  right: 0px;
  top: 0px;
  left: auto;
  transform: none;
`;

export const Header = styled.div`
  display: flex;
  height: 78px;
  align-items: center;
  justify-content: space-between;
`;

export const TitleStyle = (theme: any) => css`
  color: ${theme.color.lightBlack};
`;

export const Content = styled.div``;
