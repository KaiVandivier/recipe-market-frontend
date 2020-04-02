import React from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import Button from "./styles/Button";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem = props => {
  return (
    <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id: props.id }}>
      {(deleteItem, { error, loading, called }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        if (called) return <p>Item successfully deleted.</p>;
        return (
          <Button
            onClick={e => {
              if (!confirm("Really delete item?")) return;
              deleteItem().catch(err => alert(err.message));
            }}
          >
            Delete Item
          </Button>
        );
      }}
    </Mutation>
  );
};

export default DeleteItem;
