import React from 'react';
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

const SearchResultStyles = styled.li`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  background: ${props => (
    props.highlighted ? props.theme.yellow : props.theme.white
  )};

  * > h3 {
    font-size: 0.8rem;
    font-weight: bold;
  }
  * > p {
    font-size: 0.6rem;
    font-weight: normal;
  }
  & > img {
    height: 50px;
    width: 50px;
    object-position: center;
    object-fit: scale-down;
    margin-right: 1rem;
  }
  .info {
    padding: 0.25rem;
  }
  .price {
    padding: 0.25rem;
  }
  .error {
    grid-column: 1 / span 3;
  }
`;

// TODO: Handle "highlighted" prop

const SearchResult = ({ image, title, description, price, ...rest }) => {
  return (
    <SearchResultStyles {...rest} >
      <img src={image} alt={title} />
      <div className="info">
        <h3>{title}</h3>
      </div>
      <div className="price">
        <h3>{formatMoney(price)}</h3>
      </div>
    </SearchResultStyles>
  );
};

export default SearchResult;