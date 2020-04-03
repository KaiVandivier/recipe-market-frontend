import React from "react";
import styled from "styled-components";

const SuccessStyles = styled.div`
  padding: 0 1rem;
  margin: 1rem 0;
  border: 1px solid ${props => props.theme.lightgrey};
  border-left: 1rem solid ${props => props.theme.success};
  background: white;
`;

const Success = ({ message }) => {
  return (
    <SuccessStyles>
      <p>
        <em>Success!</em>
      </p>
      {message ? <p>{message}</p> : null}
    </SuccessStyles>
  );
};

export default Success;
