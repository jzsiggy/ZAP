import styled from 'styled-components';

const SectionContainer = styled.div`
  width: 40%;
  min-width: 430px;
  height: 450px;
  padding: 0 10px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: scroll;

  @media only screen and (max-width: 900px) {
    min-width: 80%;
    min-height: 250px;
    height: 50%;
  }
`

const Button = styled.div`
  transition: 0.3s ease all;
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0 auto;
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

export {
  SectionContainer,
  Button,
};