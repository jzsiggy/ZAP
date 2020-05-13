import styled from 'styled-components';

const BannerContainer = styled.div`
  height: 100%;
  background: linear-gradient${props => props.gradient};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const CodeContainer = styled.div`
  height: 60%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  
  @media only screen and (max-width: 900px) {
    height: 65%;
  }
`

const GithubMark = styled.a`
  transition: ease 0.2s all;
  position: absolute;
  top: 20px;
  right: 20px;
  height: 50px;
  width: 50px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url('/ZAP/gh-mark.png');

  &:hover {
    transform: scale(1.1);
  }

  @media only screen and (max-width: 900px) {
    display: none;
  }
`

export {
  BannerContainer,
  CodeContainer,
  GithubMark,
};