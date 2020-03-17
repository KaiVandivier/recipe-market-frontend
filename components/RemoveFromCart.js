import React from 'react';
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import { CURRENT_USER_QUERY } from "./User";

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
      item {
        title
      }
    }
  }
`;

const RemoveFromCart = ({ id }) => {
  return (
    <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id }} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
      {(removeFromCart, { loading, error, called }) => {
        return (
          <button onClick={removeFromCart}>Remove From Cart</button>
        )
      }}
      
    </Mutation>
  );
};

export default RemoveFromCart;