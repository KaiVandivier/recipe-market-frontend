import React from "react";
import Link from "next/link";
import styled from "styled-components";
import User from "./User";
import Signout from "./Signout";

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
    <User>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Error error={error} />;
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
            {data.currentUser ? (
              <>
                <Link href="/createItem">
                  <a>Create Item</a>
                </Link>
                <Link href="/cart">
                  <a>Cart</a>
                </Link>
                <Signout />
              </>
            ) : (
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            )}
          </StyledNav>
        );
      }}
    </User>
  );
};

export default Nav;
