import React, { Component } from "react";
import { Mutation, Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Form from "./styles/Form";
import Error from "./Error";
import PleaseSignIn from "./PleaseSignIn";
import IngredientPicker from "./IngredientPicker";
import Card from "./styles/Card";
import { SINGLE_RECIPE_QUERY } from "./SingleRecipe";
import Button from "./styles/Button";

const EDIT_RECIPE_MUTATION = gql`
  mutation EDIT_RECIPE_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $instructions: String
    $ingredients: [RecipeItemCreateInput!]
    $image: String
    $largeImage: String
  ) {
    editRecipe(
      id: $id
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

const EditRecipeStyles = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > * {
    flex: 1 1 auto;
  }
  .header {
    text-align: center;
    flex: 1 1 100%;
  }
`;

const EditRecipeWithQuery = (props) => {
  return (
    <Query query={SINGLE_RECIPE_QUERY} variables={{ id: props.id }}>
      {({ data, loading, error }) => {
        if (loading) return null;
        if (error) return <Error error={error} />;
        return (
          <EditRecipe recipe={data.recipe} />
        )
      }}
    </Query>
  )
}

class EditRecipe extends Component {
  // state = {
  //   title: "",
  //   description: "",
  //   instructions: "",
  //   image: "",
  //   largeImage: "",
  //   ingredients: [],
  //   newIngredient: null,
  //   quantity: ""
  // };

  state = { ...this.props.recipe, newIngredient: null, quantity: "" }

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
          mutation={EDIT_RECIPE_MUTATION}
          variables={{
            ...this.state,
            ingredients: this.state.ingredients.map(({ item, quantity }) => ({
              id: item.id,
              quantity
            }))
          }}
        >
          {(editRecipe, { loading, error, called }) => {
            if (error) return <Error error={error} />;
            return (
              <EditRecipeStyles>
                <div className="header">
                  <h1>Edit Recipe</h1>
                  {!error && !loading && called && (
                    <h3>Recipe edited successfully!</h3>
                  )}
                </div>
                <Card>
                  <IngredientPicker
                    handleChange={this.handleChange}
                    setNewIngredientState={this.setNewIngredientState}
                    submitNewIngredient={this.submitNewIngredient}
                    deleteIngredient={this.deleteIngredient}
                    ingredients={this.state.ingredients}
                    newIngredient={this.state.newIngredient}
                    quantity={this.state.quantity}
                  />
                </Card>
                <Card>
                  <Form
                    onSubmit={e => {
                      e.preventDefault();
                      e.target.reset();
                      editRecipe();
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
                          onChange={this.uploadFile}
                        />
                      </label>
                      {this.state.image && (
                        <div>
                          <img src={this.state.image} />
                        </div>
                      )}
                      <Button primary type="submit">
                        Edit{loading ? "ing" : null} Recipe
                      </Button>
                    </fieldset>
                  </Form>
                </Card>
              </EditRecipeStyles>
            );
          }}
        </Mutation>
      </PleaseSignIn>
    );
  }
}

export default EditRecipe;
export { EditRecipeWithQuery };
