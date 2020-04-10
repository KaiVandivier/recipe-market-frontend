import React from "react";
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

const StyledItems = styled.div`
  display: grid;
  grid-template: auto / repeat(4, 1fr);
  grid-gap: 0.5rem;
`;

const Items = (props) => {
  const userQ = useQuery(CURRENT_USER_QUERY);
  const itemsQ = useQuery(ITEMS_QUERY, {
    variables: {
      skip: (props.page - 1) * perPage,
      first: perPage,
    },
  });

  const currentUser =
    !userQ.error && !userQ.loading ? userQ.data.currentUser : null;
  const items = !itemsQ.error && !itemsQ.loading ? itemsQ.data.items : [];

  const editDeletePermissions = currentUser
    ? hasPermissions(currentUser, ["ADMIN", "ITEM_EDIT", "ITEM_DELETE"])
    : null;

  return (
    <div className="center">
      {userQ.error ? <Error error={userQ.error} /> : null}
      <ItemPagination page={Number(props.page)} />
      {itemsQ.error ? <Error error={itemsQ.error} /> : null}
      {itemsQ.loading ? (
        <p>Loading...</p>
      ) : (
        <StyledItems>
          {items.map((item) => {
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
      )}
      <ItemPagination page={Number(props.page)} />
    </div>
  );
};

export default Items;
