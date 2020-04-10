import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Mutation } from "@apollo/react-components";
import User from "./User";
import Signout from "./Signout";
import { TOGGLE_CART_MUTATION } from "./Cart";
import CartCount from "./CartCount";
import NavA from "./styles/NavA";

const StyledNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  line-height: 3rem;
  justify-content: flex-start;
  border-bottom: 3px solid ${props => props.theme.yellow};
`;

const Nav = () => {
  const { pathname } = useRouter();

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
                  <NavA here={pathname === "/"}>Home</NavA>
                </Link>
                <Link href="/recipes">
                  <NavA here={pathname === "/recipes"}>Recipes</NavA>
                </Link>
                <Link href="/items">
                  <NavA here={pathname === "/items"}>Items</NavA>
                </Link>
                {data.currentUser ? (
                  <>
                    <Link href="/createRecipe">
                      <NavA here={pathname === "/createRecipe"}>
                        Create Recipe
                      </NavA>
                    </Link>
                    <Link href="/createItem">
                      <NavA here={pathname === "/createItem"}>Create Item</NavA>
                    </Link>
                    {/* TODO: Also make a `cart` page */}
                    <Link href="/myOrders">
                      <NavA here={pathname === "/myOrders"}>My Orders</NavA>
                    </Link>
                    <NavA onClick={toggleCart}>
                      Cart
                      <CartCount
                        count={data.currentUser.cart.reduce(
                          (sum, { quantity }) => sum + quantity,
                          0
                        )}
                      />
                    </NavA>

                    <Signout />
                  </>
                ) : (
                  <>
                    <Link href="/signin">
                      <NavA here={pathname === "/signin"}>Sign In</NavA>
                    </Link>
                    <Link href="/signup">
                      <NavA here={pathname === "/signup"}>Sign Up</NavA>
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
