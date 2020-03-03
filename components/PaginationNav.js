import React from "react";
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import { perPage } from "../config";
import Link from "next/link";
import styled from "styled-components";

const PAGE_COUNT_QUERY = gql`
  query PAGE_COUNT_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const PaginationStyles = styled.div`
  margin: 1rem auto;
  a[aria-disabled="true"] {
    color: grey;
    pointer-events: none;
  }
`;

const PaginationNav = ({ page }) => {
  return (
    <Query query={PAGE_COUNT_QUERY}>
      {({ data, error, loading }) => {
        if (error) return <p>Error!</p>;
        if (loading) return <p>Loading...</p>;
        const { count } = data.itemsConnection.aggregate;
        const pages = Math.ceil(count / perPage);
        return (
          <PaginationStyles>
            <Link
              href={{ pathname: "/items", query: { page: page - 1 } }}
            >
              <a aria-disabled={page <= 1}>Previous Page</a>
            </Link>
            <p>
              Page {page} of {pages}. {count} total items.
            </p>
            <Link
              href={{ pathname: "/items", query: { page: page + 1 } }}
            >
              <a aria-disabled={page >= pages}>
                Next Page
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default PaginationNav;
