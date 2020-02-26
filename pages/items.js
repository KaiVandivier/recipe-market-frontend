import React from 'react';
import Link from "next/link";

const ItemsPage = () => {
  return (
    <div>
      <h2>Items</h2>
      <p>I'm the items page!</p>
      <Link href="/">
        <a>Go to home</a>
      </Link>
    </div>
  );
};

export default ItemsPage;