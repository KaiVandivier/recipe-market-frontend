import React from "react";

const Error = ({ error }) => {
  return (
    <div>
      <p><em>Oops! Something went wrong. Here's the error message: </em></p>
      <p>"{error.message}"</p>
    </div>
  );
};

export default Error;
