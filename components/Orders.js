import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Error from "./Error";
import Card from "./styles/Card";
import PleaseSignIn from "./PleaseSignIn";
import OrderLine from "./OrderLine";

const ORDERS_QUERY = gql`
  query ORDERS_QUERY {
    orders {
      user { id }
      total
      items {
        id
        image
        title
        description
        price
        quantity
      }
      createdAt
    }
  }
`;

const Orders = () => {
  const { data, loading, error } = useQuery(ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  return (
    <PleaseSignIn>
      <Card>
        <h1>Orders</h1>
        <ul>
          {data.orders.map(order => (
            <OrderLine order={order} key={order.id} />
          ))}
        </ul>
      </Card>
    </PleaseSignIn>
  );
};

export default Orders;