import React from 'react';
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { perPage } from "../config";
import Error from "./Error";
import RecipeCard from "./RecipeCard";

const ALL_RECIPES_QUERY = gql`
  query ALL_RECIPES_QUERY(
    $first: Int = ${perPage}
    $skip: Int = 0
  ) {
    recipes(
      orderBy: title_ASC,
      first: $first,
      skip: $skip
    ) {
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

const StyledSection = styled.section`
  text-align: center;
`;

const StyledRecipes = styled.div`
  display: grid;
  grid-template: auto / repeat(4, 1fr);
  grid-gap: 0.5rem;
`;

// TODO: Pagination

const Recipes = ({ page }) => {
  return (
    <Query query={ALL_RECIPES_QUERY} variables={{
      skip: (page - 1) * perPage,
      first: perPage
    }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <Error error={error} />
        return (
          <StyledSection>
            <h1>Recipes!</h1>
            {/* TODO: Pagination */}
            <StyledRecipes>
              {data.recipes.map(recipe => (
                <RecipeCard recipe={recipe} key={recipe.id} />
              ))}
            </StyledRecipes>
          </StyledSection>
        )
      }}
      
    </Query>
  );
};

export default Recipes;