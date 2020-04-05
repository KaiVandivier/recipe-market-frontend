import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: ${theme.black};
    background-color: ${theme.white};
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    cursor: pointer;
    color: ${props => props.theme.black};
  }
  h1 {
    color: ${theme.yellow};
  }
`;

export default GlobalStyles;
