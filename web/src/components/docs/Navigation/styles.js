import styled , { css } from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 60%;
  height: 30%;
  margin: 0 20%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media only screen and (max-width: 900px) {
    max-height: 20%;
  }
`

const Dot = styled.div`
  transition: 0.2s ease all;
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  padding: 5px;
  border: 1px solid rgb(40 42 54);
  &:hover {
    background-color: rgb(40 42 54);
    transform: scale(1.2);
    cursor: pointer;
  }
  ${props => props.current===props.step && css`
    background-color: rgb(40 42 54);
  `}
`

export {
  Container,
  Dot,
};