import React from 'react';
import Recipes from "../components/Recipes";

const RecipesPage = props => {
  return (
    <div>
      <Recipes page={props.query.page || 1} />
    </div>
  );
};

export default RecipesPage;