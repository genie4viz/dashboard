import styled from '@emotion/styled';

export const Container = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.color.grayDisabled};
  border-radius: 6px;
  height: 524px;
  outline: none;
  overflow: auto;
  padding: 20px;
  width: 632px;
`;
