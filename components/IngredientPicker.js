import React from "react";
import styled from "styled-components";
import Search from "./Search";
import Form from "./styles/Form";
import Button from "./styles/Button";
import Ingredient from "./Ingredient";

// Dividing this component into its own thing from create/edit recipe
// feels awkward because it has to receive all the stateful logic from
// the parent, but putting it all in the former would make it huge...
// Maybe there's a better way to refactor all this

const IngredientPickerStyles = styled.div`
  ul {
    padding-left: 0;
  }
`;

const IngredientPicker = props => {
  const {
    handleChange,
    setNewIngredientState,
    submitNewIngredient,
    deleteIngredient,
    ingredients,
    newIngredient,
    quantity
  } = props;

  return (
    <IngredientPickerStyles>
      <h2>Ingredients:</h2>

      {/* A list of the existing ingredients */}
      <ul>
        {ingredients.length ? (
          ingredients.map(ingredient => (
            <Ingredient small ingredient={ingredient} key={ingredient.item.id}>
              {/* Remove ingredient */}
              <Button
                small
                secondary
                onClick={e => {
                  e.preventDefault();
                  deleteIngredient(ingredient.item.id);
                }}
              >
                &times;
              </Button>
            </Ingredient>
          ))
        ) : (
          <p>No ingredients added yet :)</p>
        )}
      </ul>

      {/* A form to add a new ingredient */}
      <h3>Add a new ingredient:</h3>
      <Form
        onSubmit={e => {
          e.preventDefault();
          submitNewIngredient();
        }}
      >
        <Search onChange={setNewIngredientState} />
        <label htmlFor="quantity">
          Quantity:
          <input
            type="number"
            id="quantity"
            name="quantity"
            step="any"
            min="0"
            value={quantity}
            onChange={handleChange}
            required
          />
        </label>
        <p><em>You can add decimal quantities! Fractional quantities will be rounded up when a user checks out.</em></p>
        <Button secondary type="submit">
          Add Ingredient to List
        </Button>
      </Form>
    </IngredientPickerStyles>
  );
};

export default IngredientPicker;
