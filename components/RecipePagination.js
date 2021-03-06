import React from 'react';
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import Error from "./Error";
import { perPage } from "../config";
import PaginationStyles from "./styles/PaginationStyles";

const RECIPE_PAGE_QUERY = gql`
  query RECIPE_PAGE_QUERY {
    recipesConnection {
      aggregate {
        count
      }
    }
  }
`;

const RecipePagination = (props) => {
  return (
    <Query query={RECIPE_PAGE_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Error error={error} />;
        const { count } = data.recipesConnection.aggregate;
        const page = Number(props.page);
        const totalPages = Math.ceil(count / perPage);
        return (
          <PaginationStyles>
            <Head>
              <title>Recipe Market! | Recipes page {page} of {totalPages}</title>
            </Head>
            <Link href={{
              pathname: "recipes",
              query: { page: page - 1 }
            }}>
              <a aria-disabled={page <= 1}>Previous Page</a>
            </Link>
            <p>Page {page} of {totalPages}</p>
            <p>{count} total recipes</p>
            <Link href={{
              pathname: "recipes",
              query: { page: page + 1 }
            }}>
              <a aria-disabled={page >= totalPages}>Next Page</a>
            </Link>
          </PaginationStyles>
        )
      }}
      
    </Query>
  );
};

export default RecipePagination;