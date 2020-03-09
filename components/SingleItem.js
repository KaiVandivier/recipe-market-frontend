import React from "react";
import { Query } from "@apollo/react-components";
import styled from "styled-components";
import Link from "next/link";
import { SINGLE_ITEM_QUERY } from "./EditItem";
import Error from "./Error";
import DeleteItem from "./DeleteItem";

const StyledSingleItem = styled.div`
  text-align: center;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  background-color: white;
`;

const SingleItem = ({ id })  => {
  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Error error={error} />;
        const { title, description, price, largeImage } = data.item;
        return (
          <StyledSingleItem>
            <h1>{title}</h1>
            <img src={largeImage} width="300px" alt={title} />
            <h3>{description}</h3>
            <p>${price}</p>
            <button>Add to Cart</button>
            {/* TODO: only enable edit and delete depending on permissions */}
            <Link href={{ pathname: "editItem", query: { id } }}>
              <button>Edit Item</button>
            </Link>
            <DeleteItem id={id} />
          </StyledSingleItem>
        );
      }}
    </Query>
  );
};

export default SingleItem;