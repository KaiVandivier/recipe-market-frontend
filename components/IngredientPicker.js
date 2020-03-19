import React, { Component } from "react";
import Search from "./Search";
import Form from "./styles/Form";

class IngredientPicker extends Component {
  // state = {
  //   ingredients: [],
  //   newIngredient: null,
  //   quantity: ""
  // };

  // submitNewIngredient = () => {
  //   const { newIngredient, quantity } = this.state;
  //   const newIngredients = [
  //     ...this.state.ingredients,
  //     { item: newIngredient, quantity }
  //   ];
  //   this.setState({
  //     ingredients: newIngredients
  //   });
  // };

  // deleteIngredient = deleteId => {
  //   const newIngredients = [...this.state.ingredients].filter(
  //     ingredient => ingredient.item.id !== deleteId
  //   );
  //   this.setState({
  //     ingredients: newIngredients
  //   });
  // };

  // setNewIngredientState = item => {
  //   this.setState({
  //     newIngredient: item
  //   });
  // };

  // handleChange = e => {
  //   const { name, value, type } = e.target;
  //   this.setState({
  //     [name]: type === "number" ? Number(value) : value
  //   });
  // };

  render() {
    const {
      handleChange,
      setNewIngredientState,
      submitNewIngredient,
      deleteIngredient,
      ingredients,
      newIngredient,
      quantity
    } = this.props;

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
                  onClick={(e) => {
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
        <fieldset>
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
            <button
              onClick={e => {
                e.preventDefault(); // don't try to submit the form
                submitNewIngredient();
              }}
            >
              Submit New Ingredient
            </button>
          </label>
        </fieldset>
      </div>
    );
  }
}

export default IngredientPicker;
