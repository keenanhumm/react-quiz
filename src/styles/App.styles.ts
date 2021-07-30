import styled, {createGlobalStyle} from 'styled-components'

// static assets
import BackgroundImg from '../images/tyson-road.jpg'

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }

  body {
    background-image: url(${BackgroundImg});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    box-sizing: border-box;
    font-family: 'Catamaran', sans-serif;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: white;
  }

  h1 {
    font-family: Fascinate, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: white;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }

  .score {
    color: white;
    font-size: 2rem;
    margin: 0;
  }

  .start-button, .next-button {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0,0,0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start-button {
    max-width: 200px;
  }
`