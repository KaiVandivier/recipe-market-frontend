import React from "react";
import styled from "styled-components";
import Link from "next/link";
import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";

// TODO: Prop types?

const StyledItem = styled.div`
  text-align: center;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  background-color: white;
`;

const Item = props => {
  const { id, title, description, price, image, largeImage } = props.item;
  // TODO: Add link to individual item page
  return (
    <StyledItem>
      <Link href={{ pathname: "item", query: { id } }}>
        <a>
          <img
            src={image ? image : "https://i.imgur.com/x7AQMpk.jpg"}
            alt={title}
            width={"150px"}
          />
          <h3>{title}</h3>
          <p>{description}</p>
          <p>${price}</p>
        </a>
      </Link>
      {/* TODO: Make quantity adjustable */}
      <AddToCart itemId={id} quantity={1} />
      {/* TODO: only enable edit and delete depending on permissions */}
      <Link href={{ pathname: "editItem", query: { id } }}>
        <button>Edit Item</button>
      </Link>
      <DeleteItem id={id} />
    </StyledItem>
  );
};

export default Item;
