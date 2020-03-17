import React from 'react';
import styled from "styled-components";

const Dot = styled.div`
  display: inline-block;
  background-color: ${props => props.theme.yellow};
  color: ${props => props.theme.black};
  text-align: center;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`;

// TODO: WIP

const CartCount = ({ count }) => {
  return (
    <Dot>
      {count}
    </Dot>
  );
};

export default CartCount;