import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Button from '@app/components/Button';
import ButtonGeneric from '@app/components/Button/Generic';
import Icon from '@app/components/Icon';
import { P2 } from '@app/components/Shared/Typescale';

import TypeDropdown from '../TypeDropdown';

export const Container = styled.div`
  border: solid 1px #ebeae9;
  border-radius: 8px;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.2);
  background: white;
  width: 296px;
`;

export const StyledForm = styled.form`
  padding-top: 16px;
`;

export const TopContainer = styled.div`
  padding: 0px 16px;
`;

export const MiddleContainer = styled.div`
  height: 100%;
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 16px;
`;

export const ButtonCancel = styled(ButtonGeneric)`
  margin-right: 20px;
`;

export const ButtonSave = styled(Button)`
  width: 82px;
  height: 40px;
`;

export const StyledIcon = styled(Icon)`
  color: ${(props) => props.theme.color.grayText};
  margin-right: 8px;
`;

export const TypeButton = styled.button`
  align-items: center;
  background-color: white;
  border: 1px solid ${(props) => props.theme.color.grayDisabled};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  height: 40px;
  margin: 0px 16px 8px;
  outline: none;
  padding-left: 10px;
  position: relative;
  width: calc(100% - 32px);

  &:focus {
    border-color: ${(props) => props.theme.color.blue};
  }
`;

export const Description = styled(P2)`
  color: ${(props) => props.theme.color.grayText};
  margin-bottom: 10px;
  padding: 0px 16px;
`;

export const TypeName = styled(P2)`
  color: ${(props) => props.theme.color.grayText};
  margin: 0px;
`;

export const ArrowDown = styled(Icon)`
  position: absolute;
  right: 10px;
`;

export const StyledTypeSelect = styled(TypeDropdown)`
  margin: 0px 16px;
`;

export const FieldOptionCSS = css`
  margin-top: 16px;
`;
