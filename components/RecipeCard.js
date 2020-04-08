import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Link from "next/link";
import AddRecipeToCart from "./AddRecipeToCart";
import DeleteRecipe from "./DeleteRecipe";
import Button from "./styles/Button";
import Card from "./styles/Card";
import truncateText from "../lib/truncateText";
import { CURRENT_USER_QUERY } from "./User";

const RecipeCardStyles = styled.div`
  text-align: center;
  .link {
    cursor: pointer;
  }
`;

const RecipeCard = ({ recipe, editDeletePermissions, userOwnsRecipe }) => {
  const { id, title, description, image, ingredients } = recipe;
  // const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

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
              <em>{truncateText(description, 80)}</em>
            </p>
            {/* TODO: Calculated price? */}
          </div>
        </Link>
        <AddRecipeToCart id={id} />
        {(editDeletePermissions || userOwnsRecipe) ? (
          <>
            <Link href={{ pathname: "editRecipe", query: { id } }}>
              <Button>Edit Recipe</Button>
            </Link>
            <DeleteRecipe id={id} />
          </>
        ): null}
      </RecipeCardStyles>
    </Card>
  );
};

export default RecipeCard;
