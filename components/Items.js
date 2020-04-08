import React from "react";
import { Query } from "@apollo/react-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { perPage } from "../config";
import ItemCard from "./ItemCard";
import ItemPagination from "./ItemPagination";
import Error from "./Error";
import { CURRENT_USER_QUERY } from "./User";
import { hasPermissions } from "../lib/checkPermissions";

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
      user { id }
    }
  }
`;

const StyledSection = styled.section`
  text-align: center;
`;

const StyledItems = styled.div`
  display: grid;
  grid-template: auto / repeat(4, 1fr);
  grid-gap: 0.5rem;
`;

const Items = props => {
  const user = useQuery(CURRENT_USER_QUERY);
  if (user.loading) return <p>Loading...</p>;
  if (user.error) return <Error error={user.error} />;
  const { currentUser } = user.data;
  const editDeletePermissions = currentUser
    ? hasPermissions(currentUser, ["ADMIN", "ITEM_EDIT", "ITEM_DELETE"])
    : null;

  return (
    <StyledSection>
      <ItemPagination page={Number(props.page)} />

      <Query
        query={ITEMS_QUERY}
        variables={{
          skip: (props.page - 1) * perPage,
          first: perPage
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          const { items } = data;
          return (
            <StyledItems>
              {items.map(item => {
                return (
                  <ItemCard
                    key={item.id}
                    item={item}
                    editDeletePermissions={editDeletePermissions}
                    userOwnsItem={
                      currentUser ? currentUser.id === item.user.id : false
                    }
                  />
                );
              })}
            </StyledItems>
          );
        }}
      </Query>

      <ItemPagination page={Number(props.page)} />
    </StyledSection>
  );
};

export default Items;
