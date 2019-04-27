import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { textEllipsis, textShared } from '@app/components/Shared';

export const InputContainer = styled('div')`
  position: relative;
  width: 100%;
`;

export const InputTitle = styled.div`
  margin-bottom: 12px;

  ${textEllipsis}
  ${textShared}
`;

export const TextArea = styled.textarea<{
  isSmall?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isFocused?: boolean;
}>`
  border: 1px solid;
  border-radius: 8px;
  height: ${(props) => (props.isSmall ? '150px' : '200px')};
  margin-bottom: 20px;
  outline: none;
  padding: 15px 15px;
  resize: none;
  width: calc(100% - 32px);

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
