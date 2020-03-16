import React from "react";

const Error = ({ error }) => {
  if (!error || !error.message) return null;
  console.log(error);
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return (
      <div>
        {error.networkError.result.errors.map((error, i) => (
          <div key={i}>
            <p>
              <em>Oops! Something went wrong.</em>
            </p>
            <p>{JSON.stringify(error.message).replace("GraphQL error: ", "")}</p>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div>
      <p>
        <em>Oops! Something went wrong.</em>
      </p>
      <p>{JSON.stringify(error.message).replace("GraphQL error: ", "")}</p>
    </div>
  );
};

export default Error;
