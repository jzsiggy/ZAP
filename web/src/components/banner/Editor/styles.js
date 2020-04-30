import styled from 'styled-components';

const SectionContainer = styled.div`
  width: 40%;
  min-width: 430px;
  height: 450px;
  padding: 0 1%;
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;

  @media only screen and (max-width: 900px) {
    min-width: 90%;
    min-height: 250px;
    height: 50%;
  }

  @media only screen and (max-height: 750px) and (min-width: 900px) {
    min-height: 300px;
    height: 50%;
  }
`

const Button = styled.div`
  transition: 0.3s ease all;
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  text-align: center;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  cursor: pointer;

  &:hover {
    background: white;
    color: palevioletred;
  }
`

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

export {
  SectionContainer,
  Button,
  BtnContainer,
};