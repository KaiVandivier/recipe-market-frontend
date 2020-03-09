import React from "react";
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import { PropTypes } from "prop-types";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      name
      email
      permissions
    }
  }
`;

const User = props => {
  return (
    <Query query={CURRENT_USER_QUERY} {...props}>
      {(payload) => props.children(payload)}
    </Query>
  );
};

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User;
export { CURRENT_USER_QUERY };
