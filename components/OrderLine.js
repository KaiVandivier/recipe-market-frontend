import React from "react";
import styled from "styled-components";
import Card from "./styles/Card";
import Link from "next/link";
import formatMoney from "../lib/formatMoney";

const OrderLineStyles = styled.li`
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
  .total {
    padding: 0.5rem;
  }
  .error {
    grid-column: 1 / span 3;
  }
`;

const OrderLine = ({ order }) => {
  const { id, items, total, createdAt } = order;

  return (
    <OrderLineStyles>
      <img src={items[0].image} width="100px" />
      <div className="info">
        <Link href={{ pathname: "/order", query: { id } }}>
          <a>
            <h3>
              {items[0].title}{" "}
              {items.length > 1
                ? `and ${items.length - 1} other item${
                    items.length > 2 ? "s" : ""
                  }`
                : ""}
            </h3>
            <p>
              {/* TODO: Format date */}
              <em>Order placed at {createdAt}</em>
            </p>
          </a>
        </Link>
      </div>
      <div className="total">
        <h3>{formatMoney(total)}</h3>
      </div>
    </OrderLineStyles>
  );
};

export default OrderLine;