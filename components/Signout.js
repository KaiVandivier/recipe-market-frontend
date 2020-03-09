import React from 'react';
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import { CURRENT_USER_QUERY } from "./User";

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = () => {
  return (
    <Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
      {(signout, { loading, error, called }) => {
        return (
          <a onClick={() => signout()}>Sign Out</a>
        )
      }}
    </Mutation>
  );
};

export default Signout;