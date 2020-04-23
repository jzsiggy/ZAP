import styled , { css } from 'styled-components';

const Container = styled.div`
  width: 40%;
  min-width: 450px;
  height: 70%;

  background-color: rgb(40 42 54);
  border-radius: 5px;
  overflow: hidden;

  box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
    
  position: relative;

  @media only screen and (max-width: 900px) {
    min-width: 92%;
    height: 300px;
    max-height: 38%;
  }
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

export {
  Container,
  Dot,
  DotContainer,
  TextField,
};