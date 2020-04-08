import React from "react";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

const IngredientStyles = styled.li`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-auto-flow: column;
  align-items: center;
  font-size: ${props => props.small ? "0.75rem" : "1rem"};
  ${props => props.small ? "max-width: 400px;" : ""};  
  img {
    height: ${props => props.small ? "60px" : "100px"};
    width: ${props => props.small ? "60px" : "100px"};
    object-position: center;
    object-fit: scale-down;
  }
  .info, .subtotal {
    padding: 0.5rem;
  }
  .child {
    place-self: center;
  }
  .error {
    grid-column: 1 / span 3;
  }
`;

const Ingredient = (props) => {
  const { ingredient, children, small } = props;
  return (
    <IngredientStyles small={small}>
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
            <p>{formatMoney(ingredient.quantity * ingredient.item.price)}</p>
          </div>
        </>
      ) : (
        <div class="error">
          <h3>This item has been deleted.</h3>
        </div>
      )}
      {children ? (
        <div className="child">
          {children}
        </div>
      ) : null}
    </IngredientStyles>
  );
};

export default Ingredient;
