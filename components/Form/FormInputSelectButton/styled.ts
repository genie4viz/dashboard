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

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.color.white};
  height: 32px;
  border-radius: 4px;
`;

export const Option = styled.div<{ isSelected?: boolean }>`
  background-color: ${(props) =>
    props.isSelected ? props.theme.color.blueDark : props.theme.color.white};
  color: ${(props) =>
    props.isSelected ? props.theme.color.grayBackground : props.theme.color.grayText};
  flex: 1;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
`;
