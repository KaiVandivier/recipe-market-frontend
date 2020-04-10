import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "./User";
import Button from "./styles/Button";
import Success from "./Success";

const ADD_ITEM_TO_CART_MUTATION = gql`
  mutation ADD_ITEM_TO_CART_MUTATION($id: ID!, $quantity: Float = 1) {
    addItemToCart(id: $id, quantity: $quantity) {
      id
    }
  }
`;

const QtyStyles = styled.input`
  max-width: 4rem;
`;

const AddItemToCart = ({ id }) => {
  const [quantity, setQuantity] = useState(1);
  const [addItemToCart, { loading, error, called }] = useMutation(
    ADD_ITEM_TO_CART_MUTATION,
    {
      variables: { id, quantity },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  function handleChangeWrapper(setState) {
    return function handleChange(e) {
      const { value, type } = e.target;
      setState(type === "number" ? Number(value) : value);
    }
  };

  return (
    <div>
      {!error && !loading && called && (
        <Success message={"Item added to cart."} />
      )}
      <Button primary onClick={addItemToCart}>
        Add To Cart
      </Button>
      <label htmlFor={`quantity-${id}`}>
        Qty:{" "}
        <QtyStyles
          id={`quantity-${id}`}
          type="number"
          name="quantity"
          min="0"
          step="any"
          required
          value={quantity}
          onChange={handleChangeWrapper(setQuantity)}
        />
      </label>
    </div>
  );
};

export default AddItemToCart;
