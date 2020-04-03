import styled from "styled-components";

const DropdownStyles = styled.ul`
  position: absolute;
  max-width: 400px;
  max-height: 400px;
  overflow-y: auto;
  background: white;
  z-index: 1000;
  padding: 0;
  margin: 0;
`;

const SearchStyles = styled.div`
  margin-bottom: 1rem;
  & > label {
    display: inline;
  }
`;

export { SearchStyles, DropdownStyles };