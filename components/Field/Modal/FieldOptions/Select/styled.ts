import styled from '@emotion/styled';

export const Container = styled.div``;

export const TopContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 0 16px 8px;
`;

export const MiddleContainer = styled.div<{ isTransparent: boolean }>`
  background-color: ${(props) => props.isTransparent && props.theme.color.grayBackground};
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow: auto;
  padding: 10px 26px;
`;

export const BottomContainer = styled.div<{ isTransparent: boolean }>`
  background-color: ${(props) => props.isTransparent && props.theme.color.grayBackground};
  padding: 4px 16px;
`;

export const Empty = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${(props) => props.theme.color.grayText};
  padding: 8px 0px;
`;
