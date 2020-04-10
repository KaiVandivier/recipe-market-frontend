import React, { Component } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import Head from "next/head";
import Form from "./styles/Form";
import Error from "./Error";
import PleaseSignIn from "./PleaseSignIn";
import IngredientPicker from "./IngredientPicker";
import Card from "./styles/Card";
import Button from "./styles/Button";
import Success from "./Success";

const CREATE_RECIPE_MUTATION = gql`
  mutation CREATE_RECIPE_MUTATION(
    $title: String!
    $description: String = ""
    $instructions: String!
    $ingredients: [RecipeItemCreateInput!]!
    $image: String!
    $largeImage: String!
  ) {
    createRecipe(
      title: $title
      description: $description
      instructions: $instructions
      ingredients: $ingredients
      image: $image
      largeImage: $largeImage
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
    largeImage: "",
    ingredients: [],
    newIngredient: null,
    quantity: ""
  };

  submitNewIngredient = () => {
    const { newIngredient, quantity } = this.state;
    if (
      this.state.ingredients.some(({ item }) => item.id === newIngredient.id)
    ) {
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
    this.setState({
      title: "",
      description: "",
      instructions: "",
      image: "",
      largeImage: "",
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
              <Card>
                <Head>
                  <title>Recipe Market! | Create Recipe</title>
                </Head>
                  <h1 className="center">Create a New Recipe</h1>
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
                      e.preventDefault();
                      if (!this.state.ingredients.length) {
                        alert("Please add some ingredients!");
                        return;
                      }
                      e.target.reset();
                      createRecipe();
                      // this.clearForm();
                    }}
                  >
                    <h2>Details:</h2>
                    <fieldset aria-disabled={loading}>
                      <label htmlFor="title">
                        Recipe Title:
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
                          required
                          value={this.state.instructions}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="image">
                        Image:
                        <input
                          id="image"
                          type="file"
                          name="image"
                          placeholder="Upload an image"
                          required
                          onChange={this.uploadFile}
                        />
                      </label>
                      {this.state.image && (
                        <div>
                          <img src={this.state.image} width="200px" />
                        </div>
                      )}
                      {!error && !loading && called && (
                        <Success message={"Recipe created!"} />
                      )}
                      <Button primary type="submit">
                        Creat{loading ? "ing" : "e"} Recipe
                      </Button>
                    </fieldset>
                  </Form>
              </Card>
            );
          }}
        </Mutation>
      </PleaseSignIn>
    );
  }
}

export default CreateRecipe;
