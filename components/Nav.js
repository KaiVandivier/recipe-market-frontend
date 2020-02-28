import React from 'react';
import Link from "next/link";
import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  justify-content: start;
  align-items: space-between;
  a {
    flex-basis: 100px;
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/recipes">
        <a>Recipes</a>
      </Link>
      <Link href="/items">
        <a>Items</a>
      </Link>      
      <Link href="/createItem">
        <a>Create Item</a>
      </Link>
      <Link href="/cart">
        <a>Cart</a>
      </Link>
      
    </StyledNav>
  );
};

export default Nav;