import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  background-color: rgba(255, 255, 255, 0.99);
  border-radius: 5px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
  top: 5%;
  bottom: 5%;
  left: 5%;
  right: 5%;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Close = styled.div`
  transition: 0.2s ease all;  
  position: absolute;
  top: 10px;
  left: 10px;
  height: 30px;
  width: 30px;
  // border: 1px solid red;
  // border-radius: 50%;

  background-image: url('/ZAP/close.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`

const StmtWrapper = styled.div`
  height: 80%;
  width: 80%;
`

export {
  Container,
  Close,
  StmtWrapper,
};