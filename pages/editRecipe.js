import React from 'react';
import { EditRecipeWithQuery } from "../components/EditRecipe";

const EditRecipePage = ({ query }) => {
  return (
    <div>
      <EditRecipeWithQuery id={query.id} />
    </div>
  );
};

export default EditRecipePage;