import React from 'react';
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";

const DELETE_RECIPE_MUTATION = gql`
  mutation DELETE_RECIPE_MUTATION($id: ID!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

// TODO: Build backend

const DeleteRecipe = ({ id }) => {
  return (
    <Mutation mutation={DELETE_RECIPE_MUTATION} variables={{ id }}>
      {(deleteRecipe, { loading, error, called }) => {
        if (error) {
          alert(error.message);
          return <p>Oops! Something went wrong.</p>;
        }
        if (!loading && !error && called) return <p>Recipe deleted.</p>
        return (
          <button onClick={e => {
            if (!confirm("Are you sure you want to delete this recipe?")) return;
            deleteRecipe().catch(err => alert(err.message))
          }}>Delete Recipe</button>
        )
      }}
    </Mutation>
  );
};

export default DeleteRecipe;