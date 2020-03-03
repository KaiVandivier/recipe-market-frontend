import React from 'react';
import EditItem from "../components/EditItem";

const EditItemPage = ({ query }) => {
  return (
    <div>
      <EditItem id={query.id} />
    </div>
  );
};

export default EditItemPage;