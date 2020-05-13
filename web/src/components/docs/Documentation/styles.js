import styled from 'styled-components';

const DocContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
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

const GithubMark = styled.a`
  transition: 0.2s ease all;
  position: absolute;
  top: ${window.innerHeight + 10}px;
  right: 10px;
  height: 30px;
  width: 30px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url('/ZAP/gh-mark.png');

  &:hover {
    transform: scale(1.1);
  }

  @media only screen and (min-width: 900px) {
    display: none;
  }
`

export {
  DocContainer,
  CodeContainer,
  GithubMark,
};