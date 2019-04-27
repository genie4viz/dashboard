import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Icon from '@app/components/Icon';
import { textEllipsis } from '@app/components/Shared';

export const textShared = (props: any) => css`
  color: ${props.theme.color.grayText};
  font-size: ${props.isSmall ? '14px' : '16px'};
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Title = styled.p`
  margin-bottom: 12px;
  width: 100%;

  ${textShared}
  ${textEllipsis}
`;

export const Select = styled.div<{ isSmall?: boolean; isOpen?: boolean }>`
  background-color: white;
  border: 1px solid
    ${(props: any) => (props.isOpen ? props.theme.color.blue : props.theme.color.grayDisabled)};
  border-bottom-left-radius: ${(props) => (props.isOpen ? '0' : '8px')};
  border-bottom-right-radius: ${(props) => (props.isOpen ? '0' : '8px')};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-color: ${(props) => props.isOpen && 'transparent'};
  cursor: pointer;
  height: ${(props) => (props.isSmall ? '40px' : '48px')};
  outline: none;
  pointer-events: ${(props: any) => (props.isOpen ? 'none' : 'inherit')};
  width: 100%;

  &:focus {
    border: 1px solid ${(props: any) => props.theme.color.blue};
  }
`;

export const ValueContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Value = styled.p`
  margin: 0px 10px 0px 15px;
  flex: 1;

  ${textShared}
  ${textEllipsis}
`;

export const StyledIcon = styled(Icon)<{ isOpen: boolean }>`
  fill: ${(props: any) => props.theme.color.grayText};
  margin-right: 10px;
  transform: ${(props) => (props.isOpen ? 'rotate(0.5turn)' : 'rotate(0)')};
`;
