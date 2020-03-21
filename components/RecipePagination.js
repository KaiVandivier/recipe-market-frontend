import React from 'react';
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Link from "next/link";
import Error from "./Error";
import { perPage } from "../config";

const RECIPE_PAGE_QUERY = gql`
  query RECIPE_PAGE_QUERY {
    recipesConnection {
      aggregate {
        count
      }
    }
  }
`;

const PaginationStyles = styled.div`
  margin: 1rem auto;
  a {
    display: block;
  }
  a[aria-disabled="true"] {
    color: ${props => props.theme.lightgrey};
    pointer-events: none;
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
            <Link href={{
              pathname: "recipes",
              query: { page: page - 1 }
            }}>
              <a aria-disabled={page <= 1}>Previous Page</a>
            </Link>
            <p>Page {page} of {totalPages}. {count} total recipes!</p>
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