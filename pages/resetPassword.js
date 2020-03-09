import React from 'react';
import ResetPassword from "../components/ResetPassword";

const ResetPasswordPage = (props) => {
  return (
    <div>
      <ResetPassword resetToken={props.query.token} />
    </div>
  );
};

export default ResetPasswordPage;