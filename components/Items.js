import React from "react";
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { perPage } from "../config";
import Item from "./Item";

const ITEMS_QUERY = gql`
  query ITEMS_QUERY(
    $skip: Int = 0,
    $first: Int = ${perPage}
  ) {
    items(
      skip: $skip,
      first: $first,
      orderBy: title_ASC
    ) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

const StyledItems = styled.section`
  display: grid;
  grid-template: repeat(10, 1fr) / repeat(4, 1fr);
  grid-gap: 0.5rem;
`;

const Items = props => {
  return (
    <Query query={ITEMS_QUERY} variables={{
      skip: (props.page) ? props.page * perPage : 0,
      first: perPage,
    }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Something went wrong!</p>;
        const { items } = data;
        return (
          <StyledItems>
            {items.map(item => {
              return (
                <Item key={item.id} item={item} />
              );
            })}
          </StyledItems>
        );
      }}
    </Query>
  );
};

export default Items;
