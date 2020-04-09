import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Head from "next/head";
import Error from "./Error";
import PleaseSignIn from "./PleaseSignIn";
import OrderLine from "./OrderLine";
import Card from "./styles/Card";

const ORDERS_QUERY = gql`
  query ORDERS_QUERY {
    orders {
      id
      total
      createdAt
      user {
        id
      }
      items {
        id
        image
        title
        description
        price
        quantity
      }
    }
  }
`;

const Orders = () => {
  const { data, loading, error } = useQuery(ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  return (
    <PleaseSignIn>
      <Head>
        <title>Recipe Market! | Orders</title>
      </Head>
      <Card>
        <h1>Orders</h1>
        <ul>
          {data.orders.map((order) => (
            <OrderLine order={order} key={order.id} />
          ))}
        </ul>
      </Card>
    </PleaseSignIn>
  );
};

export default Orders;
