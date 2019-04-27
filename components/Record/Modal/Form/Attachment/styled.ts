import styled from '@emotion/styled';

import Icon from '@app/components/Icon';
import { textEllipsis } from '@app/components/Shared';

export const Container = styled.div`
  outline: none;
  position: relative;
`;

export const TopContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
  position: relative;
  width: 100%;
`;

export const BottomContainer = styled.div`
  align-items: flex-start;
  flex-wrap: wrap;
  display: flex;
  margin-bottom: 15px;
`;

export const FileItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 150px;
  height: 125px;
  margin-bottom: 16px;
  max-width: 150px;
  padding: 0px 8px;
  width: 150px;
`;

export const ImgBox = styled.button`
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.color.grayDisabled};
  height: 100%;

  &:focus,
  &:hover {
    border: 1px solid ${(props) => props.theme.color.blue};
    cursor: pointer;
  }
`;

export const StyledTitle = styled.p`
  color: #333333;
  font-size: 14px;
  margin-top: 10px;

  ${textEllipsis};
`;

export const DropContainer = styled.div`
  align-items: center;
  background-color: white;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  border: 2px dashed #e5e5e5;
  z-index: 10;
`;

export const Empty = styled.div`
  align-items: center;
  color: #636363;
  display: flex;
  margin-left: 8px;
  padding: 16px 0px;
`;

export const EmptyIcon = styled(Icon)`
  color: #bfbfbf;
  margin-right: 5px;
`;

export const EmptyTitle = styled.p`
  color: #bfbfbf;
  font-weight: bold;
  font-size: 14px;
`;
