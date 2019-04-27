import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { textEllipsis, textShared } from '@app/components/Shared';

export const InputContainer = styled('div')`
  position: relative;
  width: 100%;
`;

export const InputTitle = styled.div<{ isSmall?: boolean }>`
  color: ${(props) => props.theme.color.grayText};
  margin-bottom: 12px;

  ${textShared}
  ${textEllipsis}
`;

export const Input = styled.input<{
  isSmall?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isFocused?: boolean;
}>`
  border: 1px solid;
  border-radius: 8px;
  height: ${(props) => (props.isSmall ? '32px' : '40px')};
  margin-bottom: 20px;
  outline: none;
  padding: 3px 15px;
  width: calc(100% - 32px);

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  ${textShared}

  ${(props) => props.isFocused && isInputFocused};
  ${(props) => props.isError && isInputError};
  ${(props) => props.isDisabled && isInputDisabled};
  ${(props) => !props.isDisabled && !props.isError && !props.isFocused && isInputNormal}
`;

const isInputNormal = (props: any) => css`
  background-color: white;
  border-color: ${props.theme.color.grayDisabled};
`;

const isInputFocused = (props: any) => css`
  background-color: white;
  border-color: ${props.theme.color.blue};
`;

const isInputError = (props: any) => css`
  background-color: white;
  border-color: ${props.theme.color.red};
`;

const isInputDisabled = (props: any) => css`
  background-color: rgba(255, 255, 255, 0.5);
  border-color: ${props.theme.color.grayLightDisabled};
  color: ${props.theme.color.grayTextDisabled};
`;
