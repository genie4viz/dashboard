import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 120px;

  &:hover button {
    visibility: visible;
  }
`;

export const IconContainer = styled.a<{ color: string }>`
  align-items: center;
  background-color: ${(props) => props.color};
  border-radius: 16px;
  color: white;
  cursor: pointer;
  display: flex;
  height: 120px;
  justify-content: center;
  margin-bottom: 20px;
  width: 120px;
`;

export const Name = styled.div`
  color: ${(props) => props.theme.color.purple};
  font-size: 16px;
  font-weight: 500;
  height: 65px;
  width: 100%;
  word-break: break-all;
`;

export const DropdownStyle = (theme: any) => css`
  color: ${theme.color.white};
  top: 95px;
  position: absolute;
  right: 5px;
  visibility: hidden;
  width: 20px;
  height: 20px;

  &:hover,
  &:focus {
    color: ${theme.color.white};
    cursor: pointer;
  }

  &:active {
    color: white;
  }
`;
