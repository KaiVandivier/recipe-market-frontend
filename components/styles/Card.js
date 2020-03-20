import React from 'react';
import styled from "styled-components";

const CardStyles = styled.div`
  width: auto;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 0 5px 3px rgba(0,0,0,0.1);
`;

const Card = ({ children }) => {
  return (
    <CardStyles>
      {children}
    </CardStyles>
  );
};

export default Card;