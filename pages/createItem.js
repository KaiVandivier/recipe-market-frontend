import React from 'react';
import Link from "next/link";
import CreateItem from "../components/CreateItem";

const CreateItemPage = () => {
  return (
    <div>
      <h2>Create Item</h2>
      <p>I'm the Create Item page!</p>
      <CreateItem />
      <Link href="/">
        <a>Go to home</a>
      </Link>
    </div>
  );
};

export default CreateItemPage;