import React from "react";
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import { perPage } from "../config";

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
          <>
            {items.map(item => {
              return (
                <p key={item.id}>
                  {item.title}: {item.description}. Price: {item.price}
                </p>
              );
            })}
          </>
        );
      }}
    </Query>
  );
};

export default Items;
