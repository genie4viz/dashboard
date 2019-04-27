import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

export interface ISpinner {
  color?: string;
  size?: string;
  strokeWidth?: string;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const fadeIn = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Donut = styled('div')<ISpinner>`
  flex-shrink: 0;
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${(props) => (props.color ? props.color : '#526bf0')};
  border-width: ${(props) => (props.strokeWidth ? props.strokeWidth : '4px')};
  border-radius: 50%;
  animation: ${fadeIn} 1.2s linear infinite;
  width: ${(props) => {
    if (props.size === 'small') {
      return '18px';
    }
    if (props.size === 'medium') {
      return '30px';
    }
    return '50px';
  }};
  height: ${(props) => {
    if (props.size === 'small') {
      return '18px';
    }
    if (props.size === 'medium') {
      return '30px';
    }
    return '50px';
  }};
`;
