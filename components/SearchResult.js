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
    ${props => props.noItem ? "display: none;" : ""}
  }
  .info {
    padding: 0.25rem;
    ${props => props.noItem ? "grid-column: 1 / span 3;" : ""}
  }
  .price {
    padding: 0.25rem;
    ${props => props.noItem ? "display: none;" : ""}
  }
  .error {
    grid-column: 1 / span 3;
  }
`;

const SearchResult = ({ image, title, description, price, ...rest }) => {
  return (
    <SearchResultStyles {...rest} >
      <img src={image} alt={title} />
      <div className="info">
        <h3>{title}</h3>
      </div>
      <div className="price">
        <h3>{price ? formatMoney(price) : null}</h3>
      </div>
    </SearchResultStyles>
  );
};

export default SearchResult;