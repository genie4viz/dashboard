import styled from '@emotion/styled';

import FieldDropdownButton from '@app/components/Field/DropdownButton';
import Icon from '@app/components/Icon';

export const ColumnContainer = styled.div<{ removeMarginBottom?: boolean }>`
  margin-bottom: ${(props) => (props.removeMarginBottom ? '0px' : '35px')};
`;

export const TopContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 10px;
`;

export const ColumnIcon = styled(Icon)`
  fill: ${(props) => props.theme.color.grayText};
  margin-right: 8px;
`;

export const ColumnTitle = styled.div`
  color: ${(props) => props.theme.color.grayText};
  font-size: 12px;
  margin-right: 5px;
`;

export const DropdownIcon = styled(FieldDropdownButton)`
  height: 20px;
  width: 20px;
`;
