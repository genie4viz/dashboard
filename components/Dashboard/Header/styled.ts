import { css } from '@emotion/core';
import styled from '@emotion/styled';

const SIDE_SECTION_WIDTH = 300;

export const Container = styled.div`
  display: flex;
  height: 120px;
  padding: 0 68px;
  justify-content: center;
`;

export const LeftSection = styled.div`
  align-items: center;
  display: flex;
  width: ${SIDE_SECTION_WIDTH}px;
`;

export const MidSection = styled.div`
  align-self: center;
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const RightSection = styled.div`
  align-self: center;
  display: flex;
  justify-content: flex-end;
  width: ${SIDE_SECTION_WIDTH}px;
`;

export const RightItem = styled.div`
  align-self: center;
  margin-left: 40px;
`;

export const TitleStyle = (theme: any) => css`
  color: ${theme.color.grayBackground};
`;

export const TextStyle = (theme: any) => css`
  color: ${theme.color.grayBackground};
`;

export const ButtonStyle = (theme: any) => css`
  color: ${theme.color.grayBackground};
  border-color: ${theme.color.white};
`;
