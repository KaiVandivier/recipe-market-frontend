import React from "react";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

// This is similar to the CartItem component but with slight differences...
// It may be worthwhile to refactor this into something reusable

const OrderItemStyles = styled.li`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  img {
    height: 100px;
    width: 100px;
    object-position: center;
    object-fit: scale-down;
  }
  .info {
    padding: 0.5rem;
  }
  .subtotal {
    padding: 0.5rem;
  }
  .error {
    grid-column: 1 / span 3;
  }
`;

const OrderItem = ({ orderItem }) => {
  return (
    <OrderItemStyles>
      <img src={orderItem.image} width="100px" />
      <div className="info">
        <h3>{orderItem.title}</h3>
        <p>
          <em>
            {orderItem.quantity} &times; {formatMoney(orderItem.price)}
          </em>
        </p>
      </div>
      <div className="subtotal">
        <h3>{formatMoney(orderItem.quantity * orderItem.price)}</h3>
      </div>
    </OrderItemStyles>
  );
};

export default OrderItem;
