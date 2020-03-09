import React from "react";

const Error = ({ error }) => {
  if (!error || !error.message) return null;
  return error ? (
    <div>
      <p>
        <em>Oops! Something went wrong. Here's the error message: </em>
      </p>
      <p>"{error.message.replace("GraphQL error: ", "")}"</p>
    </div>
  ) : null;
};

export default Error;
