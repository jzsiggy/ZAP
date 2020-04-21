import styled , { css } from 'styled-components';

const Container = styled.div`
  width: 40%;
  margin: 25vh 0;

  background-color: rgb(18 18 18);
  border-radius: 5px;
  overflow: scroll;
`

const DotContainer = styled.div`
  display: flex;
  height: 40px;
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
  position: relative;
  margin: 0 10px;
  color: white;
  font-family: monospace;
`

export {
  Container,
  Dot,
  DotContainer,
  TextField,
};