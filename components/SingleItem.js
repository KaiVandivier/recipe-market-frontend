import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import Head from "next/head";
import Error from "./Error";
import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";
import formatMoney from "../lib/formatMoney";
import Button from "./styles/Button";
import Card from "./styles/Card";
import { SINGLE_ITEM_QUERY } from "./EditItem";
import { CURRENT_USER_QUERY } from "./User";
import { hasPermissions } from "../lib/checkPermissions";

const SingleItem = ({ id }) => {
  const userQ = useQuery(CURRENT_USER_QUERY);
  const itemQ = useQuery(SINGLE_ITEM_QUERY, { variables: { id } });

  const currentUser =
    !userQ.loading && !userQ.error ? userQ.data.currentUser : null;
  const editDeletePermissions = currentUser
    ? hasPermissions(currentUser, ["ADMIN", "ITEM_EDIT", "ITEM_DELETE"])
    : null;
  const userOwnsItem = currentUser ? currentUser.id === id : null;

  if (itemQ.loading) return <Card>Loading...</Card>;
  if (itemQ.error) return <Error error={itemQ.error} />;
  const { title, description, price, largeImage } = itemQ.data.item;

  return (
    <Card>
      <Head>
        <title>Recipe Market! | {title}</title>
      </Head>
      <div className="center">
        <h1>{title}</h1>
        <img src={largeImage} width="300px" alt={title} />
        <h3>{description}</h3>
        <p>{formatMoney(price)}</p>
        <AddToCart itemId={id} />
        {editDeletePermissions || userOwnsItem ? (
          <>
            <Link href={{ pathname: "editItem", query: { id } }}>
              <Button>Edit Item</Button>
            </Link>
            <DeleteItem id={id} />
          </>
        ) : null}
      </div>
    </Card>
  );
};

export default SingleItem;
