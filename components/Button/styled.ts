import { css } from '@emotion/core';
import styled from '@emotion/styled';

export interface IButtonContainer {
  isDisabled?: boolean;
  isLoading?: boolean;
  isSecondary?: boolean;
  isSmall?: boolean;
  width?: number;
}

const isMainPrimaryMixin = (props: any) => css`
  background-color: ${props.theme.color.blue};
  color: ${props.theme.color.white};

  &:hover,
  &:focus {
    background-color: ${props.theme.color.blueLight};
    cursor: pointer;
  }
  &:active {
    background-color: ${props.theme.color.blueDark};
  }
`;

const isSecondaryPrimaryMixin = (props: any) => css`
  border: 1px solid ${props.theme.color.blue};
  color: ${props.theme.color.blue};

  &:hover,
  &:focus {
    border: 2px solid ${props.theme.color.blueLight};
    color: ${props.theme.color.blueLight};
    cursor: pointer;
  }
  &:active {
    border: 2px solid ${props.theme.color.blueDark};
    color: ${props.theme.color.blueDark};
  }
`;

const isMainDisabledMixin = (props: any) => css`
  background-color: ${props.theme.color.grayDisabled};
  border: 1px solid ${props.theme.color.grayDisabled};
  color: ${props.theme.color.grayText};
  cursor: inherit;
`;

const isSecondaryDisabledMixin = (props: any) => css`
  background-color: 'white';
  border: 1px solid ${props.theme.color.grayDisabled};
  color: ${props.theme.color.grayText};
  cursor: inherit;
`;

const isMainLoadingMixin = (props: any) => css`
  background-color: ${props.theme.color.blue};
  color: ${props.theme.color.white};
  cursor: 'inherit';
  pointer-events: 'none';
`;

const isMainMixin = (props: any) => css`
  ${props.isDisabled && isMainDisabledMixin(props)}
  ${props.isLoading && isMainLoadingMixin(props)}
  ${!props.isDisabled && !props.isLoading && isMainPrimaryMixin(props)}
`;

const isSecondaryMixin = (props: any) => css`
  ${props.isDisabled && isSecondaryDisabledMixin(props)}
  ${!props.isDisabled &&
    !props.isLoading &&
    isSecondaryPrimaryMixin(props)}
`;

export const ButtonContainer = styled('button')<IButtonContainer>`
  align-items: center;
  border-radius: 24px;
  border: none;
  font-family: Galano Grotesque;
  font-size: ${(props) => (props.isSmall ? '14px' : '16px')};
  display: flex;
  outline: none;
  justify-content: center;
  height: ${(props) => (props.isSmall ? '40px' : '48px')};
  width: ${(props) => (props.width || props.isSmall ? '188px' : '240px')};
  ${(props) => (props.isSecondary ? isSecondaryMixin : isMainMixin)}
`;
