import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const ButtonStyle = (theme: any) => css`
  width: 100%;
  margin-bottom: 24px;
  margin-top: 20px;
`;

export const PanelStyle = css`
  margin-top: 24px;
`;

export const ContentScroll = styled.div`
  height: calc(100vh - 175px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 2px;
`;

export const ContentWrap = styled.div`
  margin-bottom: 24px;
`;

export const BottomPanel = styled.div``;
