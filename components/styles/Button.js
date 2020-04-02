import styled from "styled-components";

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  color: ${props => {
    if (props.primary || props.secondary) return "white";
    return props.theme.darkgrey
  }};
  border: 3px solid ${props => {
    if (props.primary) return props.theme.yellow;
    if (props.secondary) return props.theme.black;
    return props.theme.darkgrey;
  }};
  border-radius: 0.5rem;
  background: ${props => {
    if (props.primary) return props.theme.yellow;
    if (props.secondary) return props.theme.black;
    return props.theme.white;
  }};
`;

export default Button;
