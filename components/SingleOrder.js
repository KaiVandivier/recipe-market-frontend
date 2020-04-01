import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import CartItem from "./CartItem";
import OrderItem from "./OrderItem";
import Error from "./Error";
import Card from "./styles/Card";
import formatMoney from "../lib/formatMoney";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(where: { id: $id }) {
      user { id }
      items {
        id
        image
        title
        description
        price
        quantity
      }
      total
      createdAt
    }
  }
`;

const SingleOrder = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  const { items, total, createdAt } = data.order;

  return (
    <Card>
      <h1>Viewing Order</h1>
      <h2>{formatMoney(total)}</h2>
      <p>Placed on {createdAt}</p>
      <p>{items.length} total item(s)</p>
      <ul>
        {items.map(orderItem => <OrderItem orderItem={orderItem} key={orderItem.id} />)}
      </ul>
    </Card>
  );
};

export default SingleOrder;