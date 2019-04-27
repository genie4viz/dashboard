import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const Container = styled.div``;

export const ItemContainer = styled('button')<{
  isSelected: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 116px;
  padding: 16px 0px;
  margin-right: 24px;

  cursor: pointer;
  color: ${(props) => props.theme.color.grayText};
  background-color: ${(props) => props.isSelected && props.theme.color.white};
  border: ${(props) => props.isSelected && 'solid 1px '}
    ${(props) => props.isSelected && props.theme.color.blue};
  color: ${(props) => (props.isSelected ? props.theme.color.blue : props.theme.color.grayText)};

  border-radius: 8px;
  &:hover {
    color: ${(props) => props.theme.color.blueDark};
  }
`;
