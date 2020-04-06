import React from "react";
import { Query, Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { adopt } from "react-adopt";
import User from "./User";
import formatMoney from "../lib/formatMoney";
import { totalCartItems, totalCartPrice } from "../lib/cartCalcs";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Button from "./styles/Button";


const CartStyles = styled.aside`
  display: block;
  position: fixed;
  overflow-y: auto;
  padding: 1rem;
  height: 100%;
  width: 500px;
  right: ${props => (props.open ? "0" : "-500px")};
  background: ${props => props.theme.white};
  border-left: 3px solid ${props => props.theme.yellow};
  transition: right 0.4s;
  ul {
    padding-left: 0;
  }
  .close-cart {
    font-size: 1.5rem;
    padding: 1rem;
    line-height: 1rem;
  }
  .flex-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation TOGGLE_CART_MUTATION {
    toggleCart @client
  }
`;

const LOCAL_CART_STATE_QUERY = gql`
  query LOCAL_CART_STATE_QUERY {
    cartOpen @client
  }
`;

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localCartState: ({ render }) => (
    <Query query={LOCAL_CART_STATE_QUERY}>{render}</Query>
  )
});

const Cart = () => {
  return (
    <Composed>
      {({ user, toggleCart, localCartState }) => {
        if (user.loading) return null;
        const { currentUser } = user.data;
        if (!currentUser) return null; // TODO: better handling of logged-out state
        const { cartOpen } = localCartState.data;
        const totalItems = totalCartItems(currentUser.cart);
        return (
          <CartStyles open={cartOpen}>
            <header className="flex-header">
              <h1>{currentUser.name}'s cart</h1>
              <Button className="close-cart" secondary onClick={toggleCart}>&times;</Button>
            </header>
            {totalItems ? (
              <>
                <h2>{totalItems} items in cart</h2>
                <p><em>Note: Fractional quantities will be rounded up upon checkout.</em></p>
                <ul>
                  {currentUser.cart.map(cartItem => (
                    <CartItem cartItem={cartItem} key={cartItem.id} />
                  ))}
                </ul>
                <h3>
                  Total:{" "}
                  {formatMoney(totalCartPrice(currentUser.cart))}
                </h3>
              </>
            ) : (
              <p>No items in cart</p>
            )}
            <Checkout />
          </CartStyles>
        );
      }}
    </Composed>
  );
};

export default Cart;
export { TOGGLE_CART_MUTATION, LOCAL_CART_STATE_QUERY };
