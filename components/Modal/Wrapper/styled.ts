import styled from '@emotion/styled';

export const Mask = styled.div<{ isMaskTransparent?: boolean; maskColor?: string }>`
  background-color: ${(props) => {
    if (props.isMaskTransparent) return 'transparent';
    return props.maskColor || 'rgba(57, 57, 85, 0.5)';
  }};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 1000;
`;

export const Container = styled.div<{ left?: number; top?: number }>`
  left: ${(props) => (props.left ? `${props.left}px` : '50%')};
  position: fixed;
  top: ${(props) => (props.top ? `${props.top}px` : '50%')};
  transform: ${(props) => !props.left && !props.top && 'translate(-50%, -50%)'};
  z-index: 1000;
`;
