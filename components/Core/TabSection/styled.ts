import styled from '@emotion/styled';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding: 0 50px;
  position: relative;
  overflow: scroll;
`;

export const FakeBorder = styled.div`
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 34px;
  border-bottom: 1px solid ${(props) => props.theme.color.grayFadedBorder};
  z-index: 3;
`;
