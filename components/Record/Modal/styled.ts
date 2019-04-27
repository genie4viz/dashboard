import styled from '@emotion/styled';

export const Content = styled.div`
  border-radius: ${(props) => props.theme.misc.modalRadius};
  background-color: white;
  padding: 0px 40px;
  width: 520px;
`;

export const ContentHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 90px;
  width: 100%;
`;

export const ContentBody = styled.div`
  max-height: calc(85vh - 200px);
  overflow: scroll;
`;

export const ContentFooter = styled.div`
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.color.grayBorder};
  display: flex;
  justify-content: flex-end;
  padding: 20px 0 40px;
`;

export const SideBar = styled.div``;
