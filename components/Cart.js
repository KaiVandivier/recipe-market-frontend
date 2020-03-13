import React from "react";
import { Query, Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import styled from "styled-components";
import User from "./User";

const CartStyles = styled.aside`
  display: block;
  position: fixed;
  height: 100%;
  width: 200px;
  right: ${props => (props.open ? "0" : "-100px")};
  background: ${props => (props.open ? "pink" : "lightblue")};
  /* Todo: add transition */
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

const Cart = () => {
  return (
    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {(toggleCart, { loading, error }) => (
        <Query query={LOCAL_CART_STATE_QUERY}>
          {({ data: { cartOpen }, loading, error }) => (
            <CartStyles open={cartOpen}>
              <h1>Your cart</h1>
              <p>Hello I'm the cart!</p>
              <button onClick={toggleCart}>Toggle cart</button>
            </CartStyles>
          )}
        </Query>
      )}
    </Mutation>
  );
};

export default Cart;
export { TOGGLE_CART_MUTATION, LOCAL_CART_STATE_QUERY };
