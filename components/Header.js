import React from 'react';
import styled from "styled-components";
import NProgress from "nprogress";
import Router from "next/router";
import Nav from "./Nav";

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
  padding: 20px;
  background-color: ${props => props.theme.black};
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
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
    </StyledHeader>
  );
};

export default Header;