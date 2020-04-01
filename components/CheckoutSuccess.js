import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Card from "./styles/Card";
import Error from "./Error";
import OrderLine from "./OrderLine";

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
    variables: { sessionId }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  return (
    <Card>
      <h1>Success!</h1>
      <p>Your order is complete.</p>

      <ul>
        {data.order ? <OrderLine order={data.order} /> : null}
      </ul>
    </Card>
  );
};

export default CheckoutSuccess;