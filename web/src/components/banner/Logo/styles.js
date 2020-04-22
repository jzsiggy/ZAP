import styled from 'styled-components';

const Pic = styled.div`
  height: 100px;
  width: 150px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url('/logo.png');
`

const Slogan = styled.span`
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
`

const LogoContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25%;
  color: white;
`

export {
  Pic,
  Slogan,
  LogoContainer,
};