import styled from 'styled-components';

const Pic = styled.div`
  height: 100px;
  width: 150px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url('/ZAP/logo.png');

  @media only screen and (max-width: 900px) {
    height: 70px;
    width: 100px;
  }
`

const Slogan = styled.span`
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  @media only screen and (max-width: 900px) {
    font-size: 0.8rem;
  }
`

const LogoContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25%;
  color: white;

  @media only screen and (max-width: 900px) {
    height: 18%;
  }
`

export {
  Pic,
  Slogan,
  LogoContainer,
};