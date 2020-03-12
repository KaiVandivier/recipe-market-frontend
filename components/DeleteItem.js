import React from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";

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
        return (
          <div>
            {!called ? (
              <button
                onClick={e => {
                  if (!confirm("Really delete item?")) return;
                  deleteItem().catch(err => alert(err.message));
                }}
              >
                Delete Item
              </button>
            ) : (
              <p>Item successfully deleted.</p>
            )}
          </div>
        );
      }}
    </Mutation>
  );
};

export default DeleteItem;
