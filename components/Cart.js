import React from "react";
import { Query, Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { adopt } from "react-adopt";
import User from "./User";
import formatMoney from "../lib/formatMoney";
import CartItem from "./CartItem";

const CartStyles = styled.aside`
  display: block;
  position: fixed;
  padding: 1rem;
  height: 100%;
  width: 350px;
  right: ${props => (props.open ? "0" : "-350px")};
  background: ${props => props.theme.white};
  border-left: 3px solid ${props => props.theme.yellow};
  transition: right 0.5s;
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
        const { cartOpen } = localCartState.data;
        const totalItems = currentUser.cart.reduce(
          (sum, { quantity }) => sum + quantity,
          0
        );
        return (
          <CartStyles open={cartOpen}>
            <h1>{currentUser.name}'s cart</h1>
            {totalItems ? (
              <>
                <h2>{totalItems} items in cart</h2>
                <ul>
                  {currentUser.cart.map(cartItem => (
                    <CartItem cartItem={cartItem} key={cartItem.id} />
                  ))}
                </ul>
                <h3>
                  Total:{" "}
                  {formatMoney(
                    currentUser.cart.reduce(
                      (sum, { quantity, item }) => sum + quantity * item.price,
                      0
                    )
                  )}
                </h3>
              </>
            ) : (
              <p>No items in cart</p>
            )}
            <button onClick={toggleCart}>Toggle cart</button>
          </CartStyles>
        );
      }}
    </Composed>
  );
};

export default Cart;
export { TOGGLE_CART_MUTATION, LOCAL_CART_STATE_QUERY };
