import styled from 'styled-components';

const DocContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: rgb(253, 246, 228);
`

const CodeContainer = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;

  @media only screen and (max-width: 900px) {
    align-items: space-between;
  }
`

export {
  DocContainer,
  CodeContainer,
};