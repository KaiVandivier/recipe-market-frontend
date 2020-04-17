import React from "react";
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

const StyledRecipes = styled.div`
  display: grid;
  grid-template: auto / repeat(4, 1fr);
  grid-gap: 0.5rem;
`;

// TODO: Set a `recipesPerPage` value in config to differentiate from items
// TODO: Make these into one query

const Recipes = ({ page }) => {
  const userQ = { error: null, data: { currentUser: null } }; /* useQuery(CURRENT_USER_QUERY); */
  // const recipesQ = useQuery(ALL_RECIPES_QUERY, {
  //   variables: {
  //     skip: (page - 1) * perPage,
  //     first: perPage,
  //   },
  // });

  const currentUser = userQ && // (Remove `userQ &&`)
    !userQ.loading && !userQ.error ? userQ.data.currentUser : null;
  // const recipes =
  //   !recipesQ.loading && !recipesQ.error ? recipesQ.data.recipes : [];

  const editDeletePermissions = currentUser
    ? hasPermissions(currentUser, ["ADMIN", "ITEM_EDIT", "ITEM_DELETE"])
    : null;

  return (
    <div className="center">
      {/* {userQ.error ? <Error error={userQ.error} /> : null} */}
      <RecipePagination page={page} />
      {/* {recipesQ.error ? <Error error={recipesQ.error} /> : null}
      {recipesQ.loading ? (
        <p>Loading...</p>
      ) : (
        <StyledRecipes>
          {recipes.map((recipe) => (
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
      )} */}
      {/* <RecipePagination page={page} /> */}
    </div>
  );
};

export default Recipes;
