import styled from "styled-components";

const Form = styled.form`
  font-weight: 600;
  label {
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
`;

export default Form;
