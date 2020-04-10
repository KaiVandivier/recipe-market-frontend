import styled from "styled-components";

const Button = styled.button`
  padding: ${props => props.small ? "0.4rem 0.8rem" : "0.5rem 1rem"};
  margin: 0.5rem;
  font-size: ${props => props.small ? "0.75rem" : "1rem"};
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
  transition: box-shadow 0.3s;
  &:hover:not(:active) {
    box-shadow:
      0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048),
      0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072)
    ;
  }
`;

export default Button;
