import React from "react";
import styled from "styled-components";
import RemoveFromCart from "./RemoveFromCart";
import formatMoney from "../lib/formatMoney";

const CartItemStyles = styled.li`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
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

const CartItem = ({ cartItem }) => {
  return (
    <CartItemStyles>
      {cartItem.item ? (
        <>
          <img src={cartItem.item.image} width="100px" height="100px" />
          <div className="info">
            <h3>{cartItem.item.title}</h3>
            <p>
              <em>
                {cartItem.quantity} &times; {formatMoney(cartItem.item.price)}
              </em>
            </p>
          </div>
          <div className="subtotal">
            <h3>{formatMoney(cartItem.quantity * cartItem.item.price)}</h3>
          </div>
        </>
      ) : (
        <div class="error">
          <h3>This item has been deleted.</h3>
        </div>
      )}
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

export default CartItem;
