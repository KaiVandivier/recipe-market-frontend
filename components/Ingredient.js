import React from "react";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

const IngredientStyles = styled.li`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr ${props => props.children ? "1fr" : ""};
  h1, h2, h3 {
    text-align: left;
  }
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

const Ingredient = ({ ingredient, children }) => {
  return (
    <IngredientStyles>
      {ingredient.item ? (
        <>
          <img src={ingredient.item.image} width="100px" />
          <div className="info">
            <h3>{ingredient.item.title}</h3>
            <p>
              <em>
                {ingredient.quantity} &times; {formatMoney(ingredient.item.price)}
              </em>
            </p>
          </div>
          <div className="subtotal">
            <h3>{formatMoney(ingredient.quantity * ingredient.item.price)}</h3>
          </div>
        </>
      ) : (
        <div class="error">
          <h3>This item has been deleted.</h3>
        </div>
      )}
      {children ? children : null}
    </IngredientStyles>
  );
};

export default Ingredient;
