import React from 'react';
import styled from "styled-components";
import Link from "next/link";
import AddRecipeToCart from "./AddRecipeToCart";
import DeleteRecipe from "./DeleteRecipe";
import Button from "./styles/Button";

const RecipeCardStyles = styled.div`
  text-align: center;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  background-color: white;
`;

const RecipeCard = ({ recipe }) => {
  const {
    id,
    title,
    description,
    image,
    ingredients
  } = recipe;

  return (
    <RecipeCardStyles>
      <Link href={{
        pathname: "recipe",
        query: { id }
      }}>
        <a>
          <h2>{title}</h2>
          {image ? <img src={image} alt={title} width="100px" /> : null}
          <p><em>{description}</em></p>
          {/* TODO: Calculated price? */}
        </a>
      </Link>
      <AddRecipeToCart id={id} />
      <Link href={{ pathname: "editRecipe", query: { id }}}>
        <Button>Edit Recipe</Button>
      </Link>
      <DeleteRecipe id={id} />
    </RecipeCardStyles>
  );
};

export default RecipeCard;