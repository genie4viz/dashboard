import styled from '@emotion/styled';

export interface IButtonContainer {
  width?: number;
}

export const ButtonContainer = styled('button')<IButtonContainer>`
  font-size: 14px;
  color: ${(props) => props.theme.color.grayText};

  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.blueLight};
    cursor: pointer;
  }
  &:active {
    color: ${(props) => props.theme.color.blueDark};
  }
`;
