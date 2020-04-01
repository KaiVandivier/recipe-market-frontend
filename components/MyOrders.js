import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import PleaseSignIn from "./PleaseSignIn";
import Card from "./styles/Card";
import Error from "./Error";
import OrderLine from "./OrderLine";

const MY_ORDERS_QUERY = gql`
  query MY_ORDERS_QUERY {
    myOrders {
      id
      total
      createdAt
      items {
        id
        image
        title
        price
        quantity
      }
    }
  }
`;

const MyOrders = () => {
  const { data, loading, error } = useQuery(MY_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />

  const { myOrders } = data;

  return (
    <PleaseSignIn>
      <Card>
        <h1>Your orders</h1>
        {myOrders ? (
          <ul>
            {myOrders.map(order => <OrderLine order={order} key={order.id} />)}
          </ul>
        ) : (
          <p>No orders yet!</p>
        )}
      </Card>
    </PleaseSignIn>
  );
};

export default MyOrders;