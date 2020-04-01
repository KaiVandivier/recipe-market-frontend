import React from 'react';
import CheckoutSuccess from "../components/CheckoutSuccess";

const SuccessPage = ({ query }) => {
  return (
    <div>
      <CheckoutSuccess sessionId={query.session_id} />
    </div>
  );
};

export default SuccessPage;