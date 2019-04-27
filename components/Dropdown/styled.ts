import styled from '@emotion/styled';

import { textEllipsis } from '@app/components/Shared';

export const Container = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.color.grayBorder};
  border-radius: 8px;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.2);
  outline: none;
  overflow: auto;
  width: 218px;
`;

export const OptionContainer = styled.button<{
  isSelected: boolean;
}>`
  align-items: center;
  background-color: ${(props) => props.isSelected && props.theme.color.blueHover};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  height: 36px;
  outline: none;
  padding: 5px;
  width: 100%;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.color.grayText};
  flex: 1;
  font-size: 14px;
  margin: 0px 5px;
  text-align: left;

  ${textEllipsis};
`;
