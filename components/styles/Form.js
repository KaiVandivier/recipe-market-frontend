import styled from "styled-components";

const Form = styled.form`
  label {
    font-weight: 600;
    display: block;
    margin-bottom: 1rem;
  }
  input, textarea {
    font-family: inherit;
    margin-left: 1rem;
    border: 1px solid ${props => props.theme.black};
    border-radius: 0.5rem;
    padding: 0.3rem 0.5rem;
    &:focus {
      border-color: ${props => props.theme.yellow}
    }
  }
  fieldset {
    border: none;
    padding: 0;
  }
  a {
    color: ${props => props.theme.yellow};
    font-style: italic;
  }
`;

export default Form;
