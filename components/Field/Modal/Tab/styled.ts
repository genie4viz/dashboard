import styled from '@emotion/styled';

import { textEllipsis, textShared } from '@app/components/Shared/index';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabsHeader = styled.div`
  padding: 0px 15px;
  display: flex;
  align-items: center;
`;

export const Tab = styled.div<{ isSelected: boolean; isSmall: boolean }>`
  background-color: ${(props) => (props.isSelected ? props.theme.color.grayBackground : 'white')};
  cursor: pointer;
  max-width: 200px;
  margin-right: 10px;
  padding: 5px;

  ${textShared}
  ${textEllipsis}
`;

export const Content = styled.div`
  background-color: ${(props) => props.theme.color.grayBackground};
`;
