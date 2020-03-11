import React from 'react';
import Items from "../components/Items";

const ItemsPage = props => {
  return (
    <div>
      <Items page={props.query.page || 1} />
    </div>
  );
};

export default ItemsPage;