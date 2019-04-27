import styled from '@emotion/styled';

export const Wrapper = styled('div')<{ backgroundColor?: string }>`
  background-color: ${(props) => props.backgroundColor || 'lightBlue'};
  min-height: 100%;
  min-width: 900px;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  padding: 30px 50px;
`;

export const ContainerContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  justify-content: center;
`;
