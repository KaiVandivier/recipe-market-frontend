import React, { Component } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import Form from "./styles/Form";
import Error from "./Error";
import PleaseSignIn from "./PleaseSignIn";
import IngredientPicker from "./IngredientPicker";

const CREATE_RECIPE_MUTATION = gql`
  mutation CREATE_RECIPE_MUTATION(
    $title: String!
    $description: String = ""
    $instructions: String!
    $ingredients: [RecipeItemCreateInput!]!
  ) {
    createRecipe(
      title: $title
      description: $description
      instructions: $instructions
      ingredients: $ingredients
    ) {
      id
    }
  }
`;

class CreateRecipe extends Component {
  state = {
    title: "",
    description: "",
    instructions: "",
    image: "",
    ingredients: [],
    newIngredient: null,
    quantity: ""
  };

  submitNewIngredient = () => {
    console.log("submitting new");
    const { newIngredient, quantity } = this.state;
    if (this.state.ingredients.some(({ item }) => item.id === newIngredient.id)) {
      alert("This ingredient is already in the list!");
      return;
    }
    const newIngredients = [
      ...this.state.ingredients,
      { item: newIngredient, quantity }
    ];
    this.setState({
      ingredients: newIngredients
    });
  };

  deleteIngredient = deleteId => {
    console.log("deleting");
    const newIngredients = [...this.state.ingredients].filter(
      ingredient => ingredient.item.id !== deleteId
    );
    this.setState({
      ingredients: newIngredients
    });
  };

  setNewIngredientState = item => {
    console.log("changing state");
    this.setState({
      newIngredient: item
    });
  };

  handleChange = e => {
    console.log("handling change");
    const { name, value, type } = e.target;
    this.setState({
      [name]: type === "number" ? Number(value) : value
    });
  };

  uploadFile = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "recipe-market-items");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dliulozye/image/upload",
      { method: "post", body: data }
    );
    const file = await res.json();

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  clearForm = () => {
    console.log("clearing");
    this.setState({
      title: "",
      description: "",
      instructions: "",
      image: "",
      ingredients: []
    });
  };

  render() {
    return (
      <PleaseSignIn>
        <Mutation
          mutation={CREATE_RECIPE_MUTATION}
          variables={{
            ...this.state,
            ingredients: this.state.ingredients.map(({ item, quantity }) => ({
              id: item.id,
              quantity
            }))
          }}
        >
          {(createRecipe, { loading, error, called }) => {
            if (error) return <Error error={error} />;
            return (
              <div>
                <h1>Create a Recipe!</h1>
                {!error && !loading && called && (
                  <h3>Recipe created successfully!</h3>
                )}
                <IngredientPicker
                  handleChange={this.handleChange}
                  setNewIngredientState={this.setNewIngredientState}
                  submitNewIngredient={this.submitNewIngredient}
                  deleteIngredient={this.deleteIngredient}
                  ingredients={this.state.ingredients}
                  newIngredient={this.state.newIngredient}
                  quantity={this.state.quantity}
                />
                <Form
                  onSubmit={e => {
                    console.log("submitting form");
                    e.preventDefault();
                    e.target.reset();
                    createRecipe();
                    // this.clearForm();
                  }}
                >
                  <fieldset aria-disabled={loading}>
                    <label htmlFor="title">
                      Title:
                      <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Recipe Title"
                        required
                        value={this.state.title}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="description">
                      Description:
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Recipe Description"
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="instructions">
                      Instructions:
                      <textarea
                        id="instructions"
                        name="instructions"
                        placeholder="Recipe Instructions"
                        value={this.state.instructions}
                        onChange={this.handleChange}
                      />
                    </label>
                    {/* <label htmlFor="image">
                      Image:
                      <input
                        id="image"
                        type="file"
                        name="image"
                        placeholder="Upload an image"
                        required
                        // value={this.state.image}
                        onChange={this.uploadFile}
                      />
                    </label>
                    {this.state.image && (
                      <div>
                        <img src={this.state.image} />
                      </div>
                    )} */}
                    <button type="submit">
                      Creat{loading ? "ing" : "e"} Recipe
                    </button>
                  </fieldset>
                </Form>
              </div>
            );
          }}
        </Mutation>
      </PleaseSignIn>
    );
  }
}

export default CreateRecipe;
