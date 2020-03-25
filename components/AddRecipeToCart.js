import React from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import { CURRENT_USER_QUERY } from "./User";

const ADD_RECIPE_TO_CART_MUTATION = gql`
  mutation ADD_RECIPE_TO_CART_MUTATION(
    $id: ID!
    $quantity: Int = 1
  ) {
    addRecipeToCart(id: $id, quantity: $quantity) {
      id
    }
  }
`;

// TODO: Incorporate quantity, either in here or on the card/page
// (I think in here is better)
const AddRecipeToCart = ({ id }) => {
  return (
    <Mutation
      mutation={ADD_RECIPE_TO_CART_MUTATION}
      variables={{ id }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(addRecipeToCart, { loading, error, called }) => {
        if (loading) return <p>Loading...</p>
        return (
          <>
            {!error && !loading && called && <p>Ingredients added to cart!</p>}
            <button onClick={addRecipeToCart}>
              Add Recipe Ingredients to Cart
            </button>
          </>
        );
      }}
    </Mutation>
  );
};

export default AddRecipeToCart;
