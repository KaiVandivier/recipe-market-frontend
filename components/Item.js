import React from "react";
import styled from "styled-components";
import Link from "next/link";
import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";
import formatMoney from "../lib/formatMoney";
import Button from "./styles/Button";

// TODO: Prop types?

const StyledItem = styled.div`
  text-align: center;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  background-color: white;
  .link {
    cursor: pointer;
  }
`;

const Item = props => {
  const { id, title, description, price, image } = props.item;
  return (
    <StyledItem>
      <Link href={{ pathname: "item", query: { id } }}>
        <div className="link">
          <img
            src={image ? image : "https://i.imgur.com/x7AQMpk.jpg"}
            alt={title}
            width={"150px"}
          />
          <h3>{title}</h3>
          <p>{description}</p>
          <p>{formatMoney(price)}</p>
        </div>
      </Link>
      {/* TODO: Make quantity adjustable */}
      <AddToCart itemId={id} quantity={1} />
      {/* TODO: only enable edit and delete depending on permissions */}
      <Link href={{ pathname: "editItem", query: { id } }}>
        <Button>Edit Item</Button>
      </Link>
      <DeleteItem id={id} />
    </StyledItem>
  );
};

export default Item;
