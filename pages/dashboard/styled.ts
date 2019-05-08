import styled from '@emotion/styled';

export const Wrapper = styled('div')<{ backgroundColor?: string }>`
  background-color: ${(props) => props.backgroundColor || 'lightBlue'};
  min-height: 100%;
  min-width: 900px;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  padding: 0;
`;

export const ContainerContent = styled.div`
  min-height: 100vh;
`;
