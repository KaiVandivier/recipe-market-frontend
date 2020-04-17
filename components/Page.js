import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Cart from "./Cart";
import Header from "./Header";
import Meta from "./Meta";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";

const Inner = styled.main`
  padding: 1.5rem 2rem;
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  a {
    color: ${props => props.theme.yellow};
    font-style: italic;
  }
  h1 {
    font-size: 2rem;
    margin-top: 0;
  }
`;

const Page = props => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Meta />
      {/* <Cart /> */}
      <Header />
      <Inner>
        {props.children}
      </Inner>
    </ThemeProvider>
  );
};

export default Page;
