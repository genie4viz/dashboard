import styled from '@emotion/styled';

export const SubMenuContainer = styled.div`
  position: absolute;
  z-index: 1000;
`;

export const SubMenuWrapper = styled.div`
  position: relative;
`;

export const SubMenuDiv = styled.div`
  position: absolute;
  top: 20px;
  right: 0px;
  width: 140px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #ebeae9;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  color: ${(props) => props.theme.color.grayText};
  font-size: 14px;
  line-height: 26px;
  cursor: pointer;
  padding: 5px 8px;

  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.blueLight};
  }
`;
