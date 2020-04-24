import styled from 'styled-components';

const TextField = styled.div`
  width: 40%;
  min-width: 450px;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;


  @media only screen and (max-width: 900px) {
    
    border-radius: 5px;
    padding: 1%;
    background-color: rgba(0, 0, 0, 0.05);

    min-width: 90%;
    height: 300px;
    max-height: 38%;
    overflow: scroll;

    justify-content: unset;
  }
`

const Title = styled.span`
  font-weight: bold;
  font-size: 2rem;
  color: rgb(40 42 54);
  font-family: 'Orbitron', sans-serif;

  @media only screen and (max-width: 900px) {
    margin-bottom: 30px;
    font-size: 1.7rem;
  }
`

const Description = styled.span`
  margin: 0 30px;
  text-align: center;
  font-size: 1.3rem;

  @media only screen and (max-width: 900px) {
    font-size: 1rem;
  }
`

export {
  TextField,
  Title,
  Description,
};