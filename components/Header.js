import React from 'react';
import styled from "styled-components";

const HeaderStyles = styled.header`
  padding: 20px;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.red};
  width: 100%;
`;

const Header = (props) => {
  return (
    <HeaderStyles>
      <h1>Recipe Market! :)</h1>
      {/* Nav goes here */}
    </HeaderStyles>
  );
};

export default Header;