import React from "react";
import { Query } from "@apollo/react-components";
import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import Error from "./Error";
import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";
import formatMoney from "../lib/formatMoney";
import Button from "./styles/Button";
import Card from "./styles/Card";
import { SINGLE_ITEM_QUERY } from "./EditItem";

const StyledSingleItem = styled.div`
  text-align: center;
`;

const SingleItem = ({ id }) => {
  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Error error={error} />;
        const { title, description, price, largeImage } = data.item;
        return (
          <Card>
            <Head>
              <title>Recipe Market! | {title}</title>
            </Head>
            <StyledSingleItem>
              <h1>{title}</h1>
              <img src={largeImage} width="300px" alt={title} />
              <h3>{description}</h3>
              <p>{formatMoney(price)}</p>
              <AddToCart itemId={id} />
              {/* TODO: only enable edit and delete depending on permissions */}
              <Link href={{ pathname: "editItem", query: { id } }}>
                <Button>Edit Item</Button>
              </Link>
              <DeleteItem id={id} />
            </StyledSingleItem>
          </Card>
        );
      }}
    </Query>
  );
};

export default SingleItem;
