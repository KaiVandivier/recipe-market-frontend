import React from 'react';
import SingleRecipe from "../components/SingleRecipe";

const RecipePage = props => {
  return (
    <div>
      <SingleRecipe id={props.query.id} />
    </div>
  );
};

export default RecipePage;