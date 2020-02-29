import React from "react";
import styled from "styled-components";

// TODO: Prop types?

const StyledItem = styled.div`
  text-align: center;
  box-shadow: 0 0 5px 1px rgba(0,0,0,0.1);
  padding: 1rem;
  background-color: white;
`;

const Item = props => {
  const { id, title, description, price, image, largeImage } = props.item;
  // TODO: Add link to individual item page
  return (
  <StyledItem>
    <img src={"https://i.imgur.com/x7AQMpk.jpg"} alt={title} height={"150px"} />
    <h3>{title}</h3>
    <p>{description}</p>
    <p>${price}</p>
    <button>Add to Cart</button>
    <button>Delete Item</button>
  </StyledItem>
  );
};

export default Item;
