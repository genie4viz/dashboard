import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Icon from '@app/components/Icon';
import { Span2 } from '@app/components/Shared/Typescale';

export const Container = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.color.grayDisabled};
  border-radius: 8px;
  outline: none;
  overflow: hidden;
  position: relative;
`;

export const Input = styled.input`
  background-color: ${(props) => props.theme.color.grayBackground};
  border: none;
  box-sizing: border-box;
  font-size: 14px;
  color: ${(props) => props.theme.color.grayText};
  outline: none;
  height: 40px;
  padding: 5px 15px;
  width: 100%;

  &::-moz-placeholder,
  &::-webkit-input-placeholder {
    font-size: 14px;
    color: ${(props) => props.theme.color.grayText};
  }
`;

export const FilteredOptionContainer = styled.div`
  background-color: white;
  overflow: auto;
  max-height: 351px;
`;

export const Option = styled.button<{ isSelected: boolean }>`
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  outline: none;
  border: none;
  text-align: left;
  padding: 8px;
  width: 100%;
  height: 36px;
  background-color: ${(props) => (props.isSelected ? props.theme.color.blueHover : 'white')};
`;

export const OptionIcon = styled(Icon)`
  margin-right: 8px;
  color: ${(props: any) => props.theme.color.grayText};
`;

export const OptionName = styled(Span2)`
  margin: 0;
  color: ${(props) => props.theme.color.grayText};
`;

export const IconClose = css`
  position: absolute;
  right: 10px;
  top: 10px;
`;
