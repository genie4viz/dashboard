import styled from '@emotion/styled';

import ButtonIcon from '@app/components/Button/Icon';

import { textEllipsis, textShared } from '@app/components/Shared';

export const Container = styled.div<{
  isSelected?: boolean;
}>`
  align-items: stretch;
  border: 1px solid
    ${(props) => (props.isSelected ? props.theme.color.blue : props.theme.color.grayDisabled)};
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 112px;
  margin-bottom: 15px;
  outline: none;
  padding: 10px;
  position: relative;
  width: 100%;
`;

export const Title = styled.div`
  flex: 1;
  text-align: left;

  ${textShared}
  ${textEllipsis}
`;

export const OthersContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 100%;
`;

export const ItemContainer = styled.div`
  max-width: 150px;
  margin-right: 20px;
  overflow: hidden;
`;

export const ItemTitle = styled.div`
  color: ${(props) => props.theme.color.grayText};
  font-size: 12px;
  width: 100%;
  text-align: left;
  margin-bottom: 10px;

  ${textEllipsis}
`;

export const ItemValue = styled.div`
  color: ${(props) => props.theme.color.grayText};
  font-size: 14px;
  width: 100%;
  text-align: left;

  ${textEllipsis}
`;

export const DeleteIcon = styled(ButtonIcon)`
  border-radius: 12px;
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: ${(props) => props.theme.color.grayDisabled};
  padding: 6px;
`;
