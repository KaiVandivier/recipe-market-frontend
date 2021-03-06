import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "./User";
import Button from "./styles/Button";
import Success from "./Success";

const ADD_RECIPE_TO_CART_MUTATION = gql`
  mutation ADD_RECIPE_TO_CART_MUTATION($id: ID!, $quantity: Float = 1) {
    addRecipeToCart(id: $id, quantity: $quantity) {
      id
    }
  }
`;

const QtyStyles = styled.input`
  max-width: 4rem;
`;

const AddRecipeToCart = ({ id }) => {
  const [quantity, setQuantity] = useState(1);
  const [addRecipeToCart, { loading, error, called }] = useMutation(
    ADD_RECIPE_TO_CART_MUTATION,
    {
      variables: { id, quantity },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  function handleChangeWrapper(setState) {
    return function handleChange(e) {
      const { value, type } = e.target;
      setState(type === "number" ? Number(value) : value);
    };
  }

  return (
    <div>
      {!error && !loading && called && (
        <Success message={"Ingredients added to cart."} />
      )}
      <Button primary onClick={addRecipeToCart}>
        Add Recipe Ingredients to Cart
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

export default AddRecipeToCart;
