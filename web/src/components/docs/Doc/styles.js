import styled from 'styled-components';

const TextField = styled.div`
  width: 40%;
  margin: 35vh 0 25vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

const Title = styled.span`
  font-weight: bold;
  font-size: 2rem;
  color: rgb(40 42 54);
  font-family: 'Orbitron', sans-serif;
`

const Description = styled.span`
  margin: 0 30px;
  text-align: center;
  font-size: 1.3rem;
`

export {
  TextField,
  Title,
  Description,
};