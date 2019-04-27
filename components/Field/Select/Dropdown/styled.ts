import styled from '@emotion/styled';

export const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: auto;
  outline: none;
  max-height: 200px;
  position: absolute;
  left: 0px;
  right: 0px;
  border: 1px solid ${(props) => props.theme.color.grayDisabled};
  z-index: 1000;
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  color: ${(props) => props.theme.color.grayText};
  font-size: 14px;
  padding: 5px 10px;
  height: 40px;
  box-sizing: border-box;
`;

export const OptionContainer = styled.div<{
  isSelected?: boolean;
}>`
  background-color: ${(props) => props.isSelected && props.theme.color.blueHover};
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  height: 40px;
  padding: 5px 5px;
  display: flex;
  align-items: center;
`;

export const Empty = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.color.grayText};
`;
