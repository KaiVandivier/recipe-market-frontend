import React from "react";
import styled from "styled-components";

const ErrorStyles = styled.div`
  padding: 0 1rem;
  margin: 1rem 0;
  border: 1px solid ${props => props.theme.lightgrey};
  border-left: 1rem solid ${props => props.theme.danger};
  background: white;
`;

const Error = ({ error }) => {
  if (!error || !error.message) return null;
  console.log(error);
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return (
      <div>
        {error.networkError.result.errors.map((error, i) => (
          <ErrorStyles key={i}>
            <p>
              <em>Oops! Something went wrong.</em>
            </p>
            <p>{JSON.stringify(error.message).replace("GraphQL error: ", "")}</p>
          </ErrorStyles>
        ))}
      </div>
    )
  }
  return (
    <ErrorStyles>
      <p>
        <em>Oops! Something went wrong.</em>
      </p>
      <p>{JSON.stringify(error.message).replace("GraphQL error: ", "")}</p>
    </ErrorStyles>
  );
};

export default Error;
