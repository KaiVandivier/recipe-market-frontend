import styled from "styled-components";

const NavA = styled.a`
  color: ${props => props.here ? props.theme.black : props.theme.yellow};
  background: ${props => props.here ? props.theme.yellow : props.theme.black};
  font-weight: 700;
  font-size: 1.25rem;
  flex: 1 1 auto;
  padding: 0 1rem;
  text-align: center;
  &:hover {
    background: ${props=> props.theme.yellow};
    color: ${props => props.theme.black};
  }
`;

export default NavA