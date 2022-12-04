import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    font-family: 'Nunito', sans-serif;
    transition: all 0.03s ease-in-out;

  }
  html{
    @media (max-width: 1080px){
      font-size: 93.75%; //15px
    }
    
    @media (max-width: 720px){
      font-size: 87.5%; //14px
    }
  }
  
  body, input, button{
    font-family: 'Nunito', sans-serif;
    font-weight: 400;
    letter-spacing: 1px;
  }


  h1, h2, h3, h4, h5, h6, strong, small{
    font-weight: 400;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
  button{
    cursor: pointer;
    border: none;
    border-radius: 0.4rem;

    &:active {
      transform: scale(0.97);
    }
    &:hover {
      filter: brightness(0.9);
    }
    

    transition: all 0.2s ease-in-out;
  }

  ul{
    list-style-type: none;
  }

  a{
    text-decoration: none;
  }
`;
