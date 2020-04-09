import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Head from "next/head";
import Error from "./Error";
import OrderLine from "./OrderLine";
import Card from "./styles/Card";

const ORDER_QUERY = gql`
  query ORDER_QUERY($sessionId: String!) {
    order(where: { checkoutSessionId: $sessionId }) {
      id
      total
      checkoutSessionId
      createdAt
      items {
        title
        image
        price
      }
    }
  }
`;

const CheckoutSuccess = ({ sessionId }) => {
  const { data, loading, error } = useQuery(ORDER_QUERY, {
    variables: { sessionId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  return (
    <Card>
      <Head>
        <title>Recipe Market! | Checkout Successful</title>
      </Head>
      <h1>Success!</h1>
      <p>Your order is complete.</p>

      <ul>{data.order ? <OrderLine order={data.order} /> : null}</ul>
    </Card>
  );
};

export default CheckoutSuccess;
