import React from 'react';
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Card from "./styles/Card";

const SINGLE_RECIPE_QUERY = gql`
  query SINGLE_RECIPE_QUERY($id: ID!) {
    recipe(where: { id: $id }) {
      id
      title
      description
      instructions
      image
      largeImage
      ingredients {
        id
        quantity
        item {
          id
          title
          image
          price
        }
      }
    }
  }
`;

const SingleRecipe = ({ id }) => {
  return (
    <Query query={SINGLE_RECIPE_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) return <Card>Loading...</Card>
        if (error) return <Error error={error} />
        const {
          id,
          title,
          description,
          instructions,
          image,
          largeImage,
          ingredients,
        } = data.recipe;
        return (
          <Card>
            <h1>{title}</h1>

            {image ? <img src={image} alt={title} /> : null}

            <p>{description}</p>

            <h3>Ingredients:</h3>
            <button>Add Ingredients to Cart</button>
            <ul>
              {ingredients.map(({ item, quantity }) => (
                <li key={item.id}>
                  {item.image ? <img src={item.image} alt={item.title} height="100px" /> : null}
                  {quantity} {item.title}
                </li>
              ))}
            </ul>
            
            <h3>Instructions:</h3>
            <p>{instructions}</p>

            <button>Add Ingredients to Cart</button>
          </Card>
        )
      }}
    </Query>
  );
};

export default SingleRecipe;
export { SINGLE_RECIPE_QUERY };
