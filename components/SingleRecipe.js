import React from "react";
import { Query } from "@apollo/react-components";
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

const SingleRecipeStyles = styled.section`
  .header {
    text-align: center;
    img {
      padding: 1rem;
      box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
    }
  }
  .buttons {
    text-align: center;
  }
`;

const SingleRecipe = ({ id }) => {
  const user = useQuery(CURRENT_USER_QUERY);
  if (user.loading) return <p>Loading...</p>;
  if (user.error) return <Error error={user.error} />;
  const { currentUser } = user.data;
  const editDeletePermissions = currentUser
    ? hasPermissions(currentUser, ["ADMIN", "ITEM_EDIT", "ITEM_DELETE"])
    : null;
  const userOwnsRecipe = currentUser ? currentUser.id === id : null;

  return (
    <Query query={SINGLE_RECIPE_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) return <Card>Loading...</Card>;
        if (error) return <Error error={error} />;
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
            <Head>
              <title>Recipe Market! | {title}</title>
            </Head>
            <SingleRecipeStyles>
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

              <div className="buttons">
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
      }}
    </Query>
  );
};

export default SingleRecipe;
export { SINGLE_RECIPE_QUERY };
