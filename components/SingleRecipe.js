import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import Ingredient from "./Ingredient";
import AddRecipeToCart from "./AddRecipeToCart";
import DeleteRecipe from "./DeleteRecipe";
import Error from "./Error";
import Card from "./styles/Card";
import Button from "./styles/Button";
import { CURRENT_USER_QUERY } from "./User";
import { hasPermissions } from "../lib/checkPermissions";

const SINGLE_RECIPE_QUERY = gql`
  query SINGLE_RECIPE_QUERY($id: ID!) {
    recipe(where: { id: $id }) {
      title
      description
      instructions
      image
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

const SingleRecipeStyles = styled.section`
  .header {
    text-align: center;
    img {
      padding: 1rem;
      box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
    }
  }
`;

const SingleRecipe = ({ id }) => {
  const userQ = useQuery(CURRENT_USER_QUERY);
  const recipeQ = useQuery(SINGLE_RECIPE_QUERY, {
    variables: { id },
  });

  const currentUser =
    !userQ.loading && !userQ.error ? userQ.data.currentUser : null;
  const editDeletePermissions = currentUser
    ? hasPermissions(currentUser, ["ADMIN", "ITEM_EDIT", "ITEM_DELETE"])
    : null;
  const userOwnsRecipe = currentUser ? currentUser.id === id : null;

  if (recipeQ.loading) return <Card>Loading...</Card>;
  if (recipeQ.error) return <Error error={recipeQ.error} />;
  const {
    title,
    description,
    instructions,
    image,
    ingredients,
  } = recipeQ.data.recipe;

  return (
    <Card>
      <Head>
        <title>Recipe Market! | {title}</title>
      </Head>
      <SingleRecipeStyles>
        {userQ.error ? <Error error={userQ.error} /> : null}
        <div className="header">
          <h1>{title}</h1>

          {image ? <img src={image} alt={title} height="200px" /> : null}

          <p>
            <em>{description}</em>
          </p>
        </div>

        <h2>Ingredients:</h2>
        <AddRecipeToCart id={id} />
        <ul>
          {ingredients.map((ingredient) => (
            <Ingredient ingredient={ingredient} key={ingredient.id} />
          ))}
        </ul>

        <h2>Instructions:</h2>
        <p>{instructions}</p>

        <div className="center">
          <AddRecipeToCart id={id} />
          {editDeletePermissions || userOwnsRecipe ? (
            <>
              <Link href={{ pathname: "editRecipe", query: { id } }}>
                <Button>Edit Recipe</Button>
              </Link>
              <DeleteRecipe id={id} />
            </>
          ) : null}
        </div>
      </SingleRecipeStyles>
    </Card>
  );
};

export default SingleRecipe;
export { SINGLE_RECIPE_QUERY };
