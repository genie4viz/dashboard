import styled from '@emotion/styled';

import { textEllipsis } from '@app/components/Shared';
import { textShared } from '../styled';

export const Container = styled.div<{ isSmall?: boolean }>`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid ${(props: any) => props.theme.color.blue};
  border-top: none;
  left: 0px;
  max-height: ${(props) => `${5 * (props.isSmall ? 40 : 48)}px`};
  outline: none;
  overflow: auto;
  position: absolute;
  right: -2px;
  z-index: 1000;
`;

export const OptionContainer = styled.div<{ isSelected?: boolean; isSmall?: boolean }>`
  align-items: center;
  background-color: ${(props) => (props.isSelected ? props.theme.color.blueHover : 'white')};
  cursor: pointer;
  display: flex;
  height: ${(props) => (props.isSmall ? '40px' : '48px')};
  width: 100%;
  outline: none;
`;

export const Option = styled.div`
  margin: 0px 15px;
  width: 100%;

  ${textShared}
  ${textEllipsis}
`;
