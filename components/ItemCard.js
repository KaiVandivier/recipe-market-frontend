import React from "react";
import styled from "styled-components";
import Link from "next/link";
import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";
import formatMoney from "../lib/formatMoney";
import Button from "./styles/Button";
import Card from "./styles/Card";
import truncateText from "../lib/truncateText";

// TODO: Prop types?

const ItemStyles = styled.div`
  text-align: center;
  .link {
    cursor: pointer;
  }
`;

const ItemCard = ({ item, editDeletePermissions, userOwnsItem }) => {
  const { id, title, description, price, image } = item;
  return (
    <Card>
      <ItemStyles>
        <Link href={{ pathname: "item", query: { id } }}>
          <div className="link">
            <img
              src={image ? image : "https://i.imgur.com/x7AQMpk.jpg"}
              alt={title}
              width={"150px"}
            />
            <h3>{title}</h3>
            <p>{truncateText(description, 80)}</p>
            <p>{formatMoney(price)}</p>
          </div>
        </Link>
        <AddToCart id={id} />
        {/* TODO: only enable edit and delete depending on permissions */}
        {(editDeletePermissions || userOwnsItem) ? (
          <>
            <Link href={{ pathname: "editItem", query: { id } }}>
              <Button>Edit Item</Button>
            </Link>
            <DeleteItem id={id} />
          </>
        ): null}
      </ItemStyles>
    </Card>
  );
};

export default ItemCard;
