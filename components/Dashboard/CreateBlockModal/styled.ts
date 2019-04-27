import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  display: flex;
  flex-direction: row;
`;

export const GraphView = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.color.white};
  width: calc(100vw - 478px);
  heigth: 100%;
`;

export const CenterDiv = styled.div`
  background-color: ${(props) => props.theme.color.white};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const ButtonStyle = css`
  width: 100%;
  margin-bottom: 24px;
  margin-top: 20px;
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

export const Content = styled.div`
  width: 396px;
  margin-top: 24px;
  margin-bottom: 32px;
`;

export const InputItem = css`
  margin-top: 12px;
  margin-bottom: 16px;
`;

export const BottomPanel = styled.div``;
