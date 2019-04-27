import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
`;

export const IconContainer = styled.button`
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.blue};
  color: ${(props) => props.theme.color.blue};
  cursor: pointer;
  display: flex;
  height: 120px;
  justify-content: center;
  margin-bottom: 20px;
  width: 120px;
`;

export const AddName = styled.div`
  color: ${(props) => props.theme.color.purple};
  font-size: 16px;
  font-weight: 500;
  height: 65px;
  text-align: center;
  width: 100%;
`;
