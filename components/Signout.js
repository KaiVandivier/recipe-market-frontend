import React from 'react';
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import { CURRENT_USER_QUERY } from "./User";
import NavA from "./styles/NavA";

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
          <NavA onClick={() => signout()}>Sign Out</NavA>
        )
      }}
    </Mutation>
  );
};

export default Signout;