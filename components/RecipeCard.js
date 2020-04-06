import React from "react";
import styled from "styled-components";
import Link from "next/link";
import AddRecipeToCart from "./AddRecipeToCart";
import DeleteRecipe from "./DeleteRecipe";
import Button from "./styles/Button";
import Card from "./styles/Card";

const RecipeCardStyles = styled.div`
  text-align: center;
  .link {
    cursor: pointer;
  }
`;

const RecipeCard = ({ recipe }) => {
  const { id, title, description, image, ingredients } = recipe;

  return (
    <Card>
      <RecipeCardStyles>
        <Link
          href={{
            pathname: "recipe",
            query: { id }
          }}
        >
          <div className="link">
            <h2>{title}</h2>
            {image ? <img src={image} alt={title} width="100px" /> : null}
            <p>
              <em>{description}</em>
            </p>
            {/* TODO: Calculated price? */}
          </div>
        </Link>
        <AddRecipeToCart id={id} />
        <Link href={{ pathname: "editRecipe", query: { id } }}>
          <Button>Edit Recipe</Button>
        </Link>
        <DeleteRecipe id={id} />
      </RecipeCardStyles>
    </Card>
  );
};

export default RecipeCard;
