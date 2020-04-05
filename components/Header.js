import React from 'react';
import styled from "styled-components";
import NProgress from "nprogress";
import Router from "next/router";
import Nav from "./Nav";
import Search from "./Search";
import RecipeSearch from "./RecipeSearch";

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
  background-color: ${props => props.theme.black};
  width: 100%;
  border-bottom: .25rem solid ${props => props.theme.yellow};
  h1 {
    font-family: "Leckerli One", Arial, Helvetica, sans-serif;
    color: ${props => props.theme.yellow};
    margin: 0;
    padding: 1rem 2rem;
    font-size: 4rem;
  }
`;

// For use in the search `onChange` handler
function routeToItem(selectedItem) {
  Router.push({
    pathname: "/item",
    query: { id: selectedItem.id }
  });
}
function routeToRecipe(selectedItem) {
  Router.push({
    pathname: "/recipe",
    query: { id: selectedItem.id }
  });
}

const Header = (props) => {
  return (
    <StyledHeader>
      <h1>Recipe Market!</h1>
      <Nav />
      {/* <RecipeSearch onChange={routeToRecipe} /> */}
    </StyledHeader>
  );
};

export default Header;