import styled, { keyframes } from 'styled-components';

const moveUpDown = keyframes`
  0%, 100% {
    margin-top: 100px;
  }
  50% {
    margin-top: 85px;
  }
`;

const FooterContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25%;
  color: white;
  font-family: 'Orbitron', sans-serif;
  bottom: 0;
`

const FooterText = styled.span`
  position: absolute;
`

const DownArrow = styled.div`
  height: 50px;
  width: 50px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url('/ZAP/down-arrow.png');
  animation: ${moveUpDown} 2s linear infinite;
`

export {
  FooterContainer,
  FooterText,
  DownArrow,
};