import styled from '@emotion/styled';

import { textEllipsis, textShared } from '@app/components/Shared';

export interface ISwitch {
  isActive?: boolean;
  isDisabled?: boolean;
}

export const Circle = styled.div<ISwitch>`
  background-color: ${(props) =>
    props.isActive ? props.theme.color.blue : props.theme.color.grayText};
  border-radius: 8px;
  float: right;
  height: 16px;
  width: 16px;
`;

export const CircleContainer = styled.div<ISwitch>`
  align-items: center;
  background-color: ${(props) =>
    props.isActive ? props.theme.color.blueLight : props.theme.color.grayTextDisabled};
  display: flex;
  height: 4px;
  justify-content: ${(props) => (props.isActive ? 'flex-end' : 'flex-start')};
  width: 28px;
`;

export const SwitchContainer = styled.div`
  align-items: center;
  display: flex;
  height: 20px;
  justify-content: center;

  &:focus {
    ${Circle} {
      background-color: ${(props) => props.theme.color.blueLight};
    }
  }
`;

export const Container = styled.div<ISwitch>`
  align-items: center;
  cursor: pointer;
  display: flex;
  outline: none;
  pointer-events: ${(props) => props.isDisabled && 'none'};
`;

export const Title = styled.div`
  margin-left: 12px;
  flex: 1;

  ${textShared}
`;
