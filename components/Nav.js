import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Mutation } from "@apollo/react-components";
import User from "./User";
import Signout from "./Signout";
import { TOGGLE_CART_MUTATION } from "./Cart";
import CartCount from "./CartCount";

const StyledNav = styled.nav`
  display: flex;
  justify-content: start;
  align-items: space-between;
  a {
    flex-basis: 100px;
    text-align: center;
  }
`;

const Nav = () => {
  return (
    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {toggleCart => (
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
                    <Link href="/createRecipe">
                      <a>Create Recipe</a>
                    </Link>
                    <Link href="/createItem">
                      <a>Create Item</a>
                    </Link>
                    {/* TODO: Also make a `cart` page */}
                    <Link href="/myOrders">
                      <a>My Orders</a>
                    </Link>
                    <a onClick={toggleCart}>Cart </a>
                    <CartCount
                      count={data.currentUser.cart.reduce(
                        (sum, { quantity }) => sum + quantity,
                        0
                      )}
                    />
                    <Signout />
                  </>
                ) : (
                  <>
                    <Link href="/signin">
                      <a>Sign In</a>
                    </Link>
                    <Link href="/signup">
                      <a>Sign Up</a>
                    </Link>
                  </>
                )}
              </StyledNav>
            );
          }}
        </User>
      )}
    </Mutation>
  );
};

export default Nav;
