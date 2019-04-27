import styled from '@emotion/styled';

export interface IButtonContainer {
  width?: number;
}

export const ButtonContainer = styled('button')<IButtonContainer>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${(props) => props.theme.color.grayText};

  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.purple};
    cursor: pointer;
  }

  &:active {
    color: black;
  }
`;
