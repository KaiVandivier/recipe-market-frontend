import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
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
  const [addToCart, { loading, error, called }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { ...props },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  const [quantity, setQuantity] = useState(1);

  return (
        <Button primary onClick={addToCart}>Add To Cart</Button>
  );
};

export default AddToCart;