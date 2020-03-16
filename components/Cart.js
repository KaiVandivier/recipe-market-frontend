import React from "react";
import { Query, Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import styled from "styled-components";
import User from "./User";
import Error from "./Error";

const CartStyles = styled.aside`
  display: block;
  position: fixed;
  padding: 1rem;
  height: 100%;
  width: 200px;
  right: ${props => (props.open ? "0" : "-200px")};
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

// TODO: Refetch user query (to refetch cart) on "AddToCart" mutation

const Cart = () => {
  return (
    <User>
      {({ data, loading, error }) => {
        if (error) return <Error error={error} />
        if (loading) return null;
        const { currentUser } = data
        return (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {(toggleCart, { loading, error }) => (
              <Query query={LOCAL_CART_STATE_QUERY}>
                {({ data: { cartOpen }, loading, error }) => (
                  <CartStyles open={cartOpen}>
                    <h1>{currentUser.name}'s cart</h1>
                    <p>Hello I'm the cart!</p>
                    {currentUser.cart.length ? (
                      <>
                        {currentUser.cart.map(cartItem => (
                          <p key={cartItem.id}>{cartItem.item.title}, {cartItem.quantity}</p>
                        ))}
                      </>
                    ) : <p>No items in cart</p>}
                    <button onClick={toggleCart}>Toggle cart</button>
                  </CartStyles>
                )}
              </Query>
            )}
          </Mutation>
        )
      }}
    </User>
  );
};

export default Cart;
export { TOGGLE_CART_MUTATION, LOCAL_CART_STATE_QUERY };
