import React from 'react';
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import { CURRENT_USER_QUERY } from "./User";
import Button from "./styles/Button";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($itemId: ID!, $quantity: Int = 1) {
    addToCart(itemId: $itemId, quantity: $quantity) {
      id
    }
  }
`;

const AddToCart = (props) => {
  return (
    <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ ...props }} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
      {(addToCart, { loading, error, called }) => (
        <Button primary onClick={addToCart}>Add To Cart</Button>
      )}
    </Mutation>
  );
};

export default AddToCart;