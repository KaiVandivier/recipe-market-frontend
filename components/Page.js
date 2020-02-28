import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Header from "./Header";
import Meta from "./Meta";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";

const Inner = styled.main`
  padding: 1.5rem 2rem;
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
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
