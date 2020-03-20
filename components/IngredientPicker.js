import React from "react";
import Search from "./Search";
import Form from "./styles/Form";

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
      <h3>Ingredients:</h3>

      {/* A list of the existing ingredients */}
      <ul>
        {!!ingredients.length &&
          ingredients.map(({ item, quantity }) => (
            <li key={item && item.id}>
              {item.title}: {quantity}{" "}
              <button
                onClick={e => {
                  e.preventDefault();
                  deleteIngredient(item.id);
                }}
              >
                Remove ingredient
              </button>
            </li>
          ))}
      </ul>

      {/* A form to add a new ingredient */}
      <h3>Add a new ingredient:</h3>
      <Form>
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
          />
        </label>
        <button
          onClick={e => {
            e.preventDefault(); // don't try to submit the form
            submitNewIngredient();
          }}
        >
          Submit New Ingredient
        </button>
      </Form>
    </div>
  );
};

export default IngredientPicker;
