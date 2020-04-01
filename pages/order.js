import React from 'react';
import SingleOrder from "../components/SingleOrder";

const OrderPage = ({ query }) => {
  return (
    <div>
      <SingleOrder id={query.id} />
    </div>
  );
};

export default OrderPage;