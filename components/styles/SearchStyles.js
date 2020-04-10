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
  margin-bottom: ${props => props.fullWidth ? "0" : "1rem"};
  ${props => props.fullWidth ? "" : ""}
  input {
    ${props => props.fullWidth ? `
      display: block;
      height: 2rem;
      width: 100vw;
      padding: 1rem;
      border: none;
    ` : ""}
  }
  label.search-label {
    display: ${props => props.fullWidth ? "none" : "inline"};
  }
`;

export { SearchStyles, DropdownStyles };