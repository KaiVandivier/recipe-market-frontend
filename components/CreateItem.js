import React, { Component } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import Form from "./styles/Form";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String!
    $largeImage: String!
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    price: 0,
    image: "",
    largeImage: "",
    confoundingTester: "hello!"
  };

  handleChange = e => {
    const { name, value, type } = e.target;
    this.setState({
      [name]: (type === "number") ? Number(value) : value
    })
  };

  clearForm = () => {
    this.setState({
      title: "",
      description: "",
      price: 0,
      image: "",
      largeImage: "",
    })
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error, called }) => {
          if (error) {
            console.log(error);
            return <h3>Uh oh! Something went wrong. :(</h3>
          }
          return (
            <Form onSubmit={(e) => {
              e.preventDefault();
              createItem();
              this.clearForm();
            }}>
              <h1>Create an Item for Sale</h1>
              {!error && !loading && called && (
                <h3>Item created successfully!</h3>
              )}
              <fieldset aria-disabled={loading}>
                <label htmlFor="title">
                  Title:
                  <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Item Title"
                    required
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="description">
                  Description:
                  <input
                    id="description"
                    type="text"
                    name="description"
                    placeholder="Item Description"
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="price">
                  Price:
                  <input
                    id="price"
                    type="number"
                    name="price"
                    // placeholder="Item price"
                    required
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="image">
                  image:
                  <input
                    id="image"
                    type="text"
                    name="image"
                    placeholder="Item image"
                    required
                    value={this.state.image}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="largeImage">
                  largeImage:
                  <input
                    id="largeImage"
                    type="text"
                    name="largeImage"
                    placeholder="Item largeImage"
                    required
                    value={this.state.largeImage}
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit">Creat{loading ? "ing" : "e"} Item</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateItem;
