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

export {
  BannerContainer,
  CodeContainer,
};