import React from 'react';
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($itemId: ID!, $quantity: Int = 1) {
    addToCart(itemId: $itemId, quantity: $quantity) {
      id
      item {
        title
      }
    }
  }
`;

const AddToCart = (props) => {
  return (
    <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ ...props }}>
      {(addToCart, { loading, error, called }) => (
        <button onClick={addToCart}>Add To Cart</button>
      )}
    </Mutation>
  );
};

export default AddToCart;