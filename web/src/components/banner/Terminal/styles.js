import styled , { css , keyframes } from 'styled-components';

const Container = styled.div`
  width: 40%;
  min-width: 450px;
  height: 450px;

  background-color: rgb(18 18 18);
  border-radius: 5px;
  overflow: hidden;

  box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);

  position: relative;

  @media only screen and (max-width: 900px) {
    min-width: 92%;
    height: 35%;
  }

  @media only screen and (max-height: 750px) and (min-width: 900px) {
    min-height: 300px;
    height: 50%;
  }

  z-index: 1;
`

const DotContainer = styled.div`
  display: flex;
  height: 40px;
  position: absolute;
`

const Dot = styled.div`
  height: 10px;
  width: 10px;
  top: 10px;
  border-radius: 50%;
  position: relative;

  ${props => css`
    left: ${props.left};
    background-color: ${props.color};
    border: 1px solid ${props.color};
  `}
`
const TextField = styled.div`
  position: absolute;
  height: 95%;
  top: 30px;
  margin: 0 10px;
  color: white;
  font-family: monospace;
  overflow: scroll;

  // border: 1px solid red;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const ToggleStmt = styled.div`
  transition: 0.3s ease all;
  position: absolute;
  bottom: 10px;
  right: 10px;
  height: 30px;
  width: 30px;
  border: 2px dotted white;
  border-radius: 50%;

  animation: ${rotate} 10s linear infinite;

  &:hover {
    cursor: pointer;
    transform: scale(1.1)
  }
`

export {
  Container,
  Dot,
  DotContainer,
  TextField,
  ToggleStmt,
};