import styled from '@emotion/styled';

import ButtonIcon from '@app/components/Button/Icon';
import { textEllipsis } from '@app/components/Shared';

export const Container = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  box-sizing: border-box;
  height: 24px;
  border-radius: 12px;
  min-width: 24px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 6px;
  flex-shrink: 0;
`;

export const Name = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.color.grayText};

  ${textEllipsis}
`;

export const Icon = styled(ButtonIcon)`
  padding: 5px;
  color: ${(props) => props.theme.color.grayText};
`;
