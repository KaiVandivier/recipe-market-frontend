import React from "react";
import { Query } from "@apollo/react-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { perPage } from "../config";
import Error from "./Error";
import RecipeCard from "./RecipeCard";
import RecipePagination from "./RecipePagination";
import { CURRENT_USER_QUERY } from "./User";
import { hasPermissions } from "../lib/checkPermissions";

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
      user { id }
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

// TODO: Set a `recipesPerPage` value in config to differentiate from items

const Recipes = ({ page }) => {
  const user = useQuery(CURRENT_USER_QUERY);
  if (user.loading) return <p>Loading...</p>;
  if (user.error) return <Error error={user.error} />;
  const { currentUser } = user.data;
  const editDeletePermissions = currentUser
    ? hasPermissions(currentUser, ["ADMIN", "ITEM_EDIT", "ITEM_DELETE"])
    : null;

  return (
    <Query
      query={ALL_RECIPES_QUERY}
      variables={{
        skip: (page - 1) * perPage,
        first: perPage
      }}
    >
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Error error={error} />;
        return (
          <StyledSection>
            <RecipePagination page={page} />
            <StyledRecipes>
              {data.recipes.map(recipe => (
                <RecipeCard
                  editDeletePermissions={editDeletePermissions}
                  userOwnsRecipe={
                    currentUser ? currentUser.id === recipe.user.id : false
                  }
                  recipe={recipe}
                  key={recipe.id}
                />
              ))}
            </StyledRecipes>
            <RecipePagination page={page} />
          </StyledSection>
        );
      }}
    </Query>
  );
};

export default Recipes;
