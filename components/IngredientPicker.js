import React from "react";
import Search from "./Search";
import Form from "./styles/Form";
import Button from "./styles/Button";

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
    <div>
      <h2>Ingredients:</h2>

      {/* A list of the existing ingredients */}
      <ul>
        {ingredients.length ? (
          ingredients.map(({ item, quantity }) => (
            <li key={item && item.id}>
              {item.title}: {quantity}{" "}
              <Button
                onClick={e => {
                  e.preventDefault();
                  deleteIngredient(item.id);
                }}
              >
                Remove ingredient
              </Button>
            </li>
          ))
        ) : (
          <li>No ingredients added yet :)</li>
        )}
      </ul>

      {/* A form to add a new ingredient */}
      <h3>Add a new ingredient:</h3>
      <Form
        onSubmit={e => {
          e.preventDefault(); // don't try to submit the form
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
        <Button secondary type="submit">Submit New Ingredient</Button>
      </Form>
    </div>
  );
};

export default IngredientPicker;
