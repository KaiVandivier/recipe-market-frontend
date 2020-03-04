import React from "react";
import styled from "styled-components";
import Link from "next/link";
import DeleteItem from "./DeleteItem";

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
    <img src={((image) ? image : "https://i.imgur.com/x7AQMpk.jpg")} alt={title} width={"150px"} />
    <h3>{title}</h3>
    <p>{description}</p>
    <p>${price}</p>
    <button>Add to Cart</button>
    {/* TODO: only enable edit and delete depending on permissions */}
    <Link href={{ pathname: "editItem", query: { id } }}>
      <button>Edit Item</button>
    </Link>
    <DeleteItem id={id} />
  </StyledItem>
  );
};

export default Item;
