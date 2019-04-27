import css from '@emotion/css';
import styled from '@emotion/styled';

const containerMixin = (props: any) => css`
  align-items: center;
  background: ${props.activeTab ? 'white' : 'transparent'};
  border-top-left-radius: 23px;
  border-top-right-radius: 23px;
  border: 1px solid ${props.theme.color.grayFadedBorder};
  border-bottom: 1px solid ${props.activeTab ? 'white' : props.theme.color.blueHover};
  cursor: pointer;
  color: ${props.theme.color.grayText};
  font-size: 14px;
  display: inline-flex;
  flex-shrink: 0;
  font-weight: ${props.activeTab && 'bold'};
  justify-content: center;
  margin-right: 30px;
  padding: 7px 30px;
  position: relative;
  z-index: ${props.activeTab ? '4' : '0'};

  /* Squares */
  &:before,
  &:after {
    background: ${props.activeTab ? 'white' : props.theme.color.blueHover};
    bottom: -1px;
    content: '';
    position: absolute;
    height: 15px;
    width: 15px;
  }

  &:before {
    left: -15px;
  }
  &:after {
    right: -15px;
  }

  /* Circles */
  & > form:before,
  & > form:after,
  & > span:before,
  & > span:after {
    margin: 0;
    content: '';
    background: ${props.theme.color.blueHover};
    width: 17px;
    height: 15px;
    border-bottom: 1px solid ${props.theme.color.grayFadedBorder};
    bottom: -1px;
    position: absolute;

    /* Circles over squares */
    z-index: 2;
  }
  & > form:before,
  & > span:before {
    background: ${props.theme.color.blueHover};
    border-bottom-right-radius: 90%;
    border-right: 1px solid ${props.theme.color.grayFadedBorder};
    left: -18px;
  }
  & > form:after,
  & > span:after {
    background: ${props.theme.color.blueHover};
    border-bottom-left-radius: 90%;
    border-left: 1px solid ${props.theme.color.grayFadedBorder};
    right: -18px;
  }
`;

export const Button = styled.button`
  ${containerMixin}
`;
