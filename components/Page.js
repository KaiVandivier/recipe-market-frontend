import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Header from "./Header";
import Meta from "./Meta";
import theme from "../lib/theme";

const Inner = styled.main`
  padding: 20px;
`;

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: ${theme.black}
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
    font-style: italic;
  }
`;

const Page = props => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Meta />
      <Header />
      <Inner>
        {props.children}
      </Inner>
    </ThemeProvider>
  );
};

export default Page;
