import React from 'react';
import styled from "styled-components";
import NProgress from "nprogress";
import Router from "next/router";
import Nav from "./Nav";
import Search from "./Search";

Router.onRouteChangeStart = () => {
  NProgress.start();
}
Router.onRouteChangeComplete = () => {
  NProgress.done();
}
Router.onRouteChangeError = () => {
  NProgress.done();
}

const StyledHeader = styled.header`
  padding: 1.5rem 2rem;
  background-color: ${props => props.theme.black};
  width: 100%;
  border-bottom: .25rem solid ${props => props.theme.yellow};
  h1, a {
    color: ${props => props.theme.yellow};
  }
  h1 {
    font-family: "Leckerli One", Arial, Helvetica, sans-serif;
    font-size: 4rem;
    line-height: 1rem;
  }
`;

const Header = (props) => {
  return (
    <StyledHeader>
      <h1>Recipe Market!</h1>
      <Nav />
      <Search />
    </StyledHeader>
  );
};

export default Header;