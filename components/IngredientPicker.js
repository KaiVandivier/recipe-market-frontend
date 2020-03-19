import React, { Component } from "react";
import Search from "./Search";

class IngredientPicker extends Component {
  state = {
    ingredients: [],
    newIngredient: null,
    quantity: ""
  };

  submitNewIngredient = () => {
    const { newIngredient, quantity } = this.state;
    const newIngredients = [
      ...this.state.ingredients,
      { item: newIngredient, quantity }
    ];
    this.setState({
      ingredients: newIngredients,
      newIngredient: null, // TODO: Do I really need to clear these things?
      quantity: ""
    });
  };

  deleteIngredient = deleteId => {
    const newIngredients = [...this.state.ingredients].filter(
      ingredient => ingredient.item.id !== deleteId
    );
    this.setState({
      ingredients: newIngredients
    });
  };

  setNewIngredientState = item => {
    this.setState({
      newIngredient: item
    });
  };

  handleChange = e => {
    const { name, value, type } = e.target;
    this.setState({
      [name]: type === "number" ? Number(value) : value
    });
  };

  render() {
    return (
      <div>
        <h3>Ingredients:</h3>

        {/* TODO: A list of the existing ingredients */}
        <ul>
          {this.state.ingredients.map(({ item, quantity }) => (
            <li>
              {item.title}: {quantity} <button onClick={() => this.deleteIngredient(item.id)}>Remove ingredient</button>
            </li>
          ))}
        </ul>

        {/* TODO: A form to add a new ingredient */}
        <h3>Add a new ingredient:</h3>
        <fieldset>
          <Search onChange={this.setNewIngredientState} />
          <label htmlFor="quantity">
            Quantity:
            <input
              type="number"
              id="quantity"
              name="quantity"
              step="any"
              min="0"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button onClick={() => this.submitNewIngredient()}>
              Submit New Ingredient
            </button>
          </label>
        </fieldset>
      </div>
    );
  }
}

export default IngredientPicker;
