import React, { Component } from "react";
import { Query, Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import Head from "next/head";
import Form from "./styles/Form";
import Card from "./styles/Card";
import Button from "./styles/Button";
import Success from "./Success";

// TODO: image and large image editing?

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

const EDIT_ITEM_MUTATION = gql`
  mutation EDIT_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    editItem(id: $id, title: $title, description: $description, price: $price) {
      id
    }
  }
`;

class EditItem extends Component {
  state = {};

  handleChange = (e) => {
    const { name, value, type } = e.target;
    this.setState({
      [name]: type === "number" ? Number(value) : value,
    });
  };

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>No item found for ID {this.props.id}</p>; // TODO: A better error handling
          return (
            <Mutation
              mutation={EDIT_ITEM_MUTATION}
              variables={{ ...this.state, id: this.props.id }}
            >
              {(editItem, { loading, error, called }) => {
                if (error) {
                  console.log(error);
                  return <h3>Uh oh! Something went wrong. :(</h3>;
                }
                return (
                  <Card>
                    <Head>
                      <title>Recipe Market! | Edit Item</title>
                    </Head>

                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        editItem();
                      }}
                    >
                      <h1>Edit Item</h1>
                      <fieldset aria-disabled={loading}>
                        <label htmlFor="title">
                          Title:
                          <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Item Title"
                            required
                            defaultValue={data.item.title}
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
                            defaultValue={data.item.description}
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
                            defaultValue={data.item.price}
                            onChange={this.handleChange}
                          />
                        </label>
                        {data.item.image && (
                          <div>
                            <img src={data.item.image} />
                          </div>
                        )}
                        {!error && !loading && called && (
                          <Success message={"Changes submitted."} />
                        )}
                        <Button primary type="submit">
                          Submit{loading ? "ting" : ""} Changes
                        </Button>
                      </fieldset>
                    </Form>
                  </Card>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default EditItem;
export { SINGLE_ITEM_QUERY };
