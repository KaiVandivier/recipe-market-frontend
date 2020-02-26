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
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.red};
  width: 100%;
`;

const Header = (props) => {
  return (
    <StyledHeader>
      <h1>Recipe Market! :)</h1>
      <Nav />
    </StyledHeader>
  );
};

export default Header;