import React from 'react';
import styled from "styled-components";

// Like ItemCard, this will receive its `recipe` from props and make a little 

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
      <h2>{title}</h2>
      {image ? <img src={image} alt={title} width="100px" /> : null}
      <p><em>{description}</em></p>
      {/* TODO: Calculated price? */}
      <button>Add Ingredients to Cart</button>
      <button>Edit Recipe</button>
      <button>Delete Recipe</button>
    </RecipeCardStyles>
  );
};

export default RecipeCard;