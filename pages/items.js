import React from 'react';
import Link from "next/link";
import Items from "../components/Items";

const ItemsPage = props => {
  return (
    <div>
      <h2>Items</h2>
      <Items page={props.query.page} />
    </div>
  );
};

export default ItemsPage;