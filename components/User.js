import React from "react";
import { Query } from "@apollo/react-components";
import {gql} from "apollo-boost";

const USER_QUERY = gql`
  query USER_QUERY($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

const User = props => {
  console.log("query: ", props.query);
  return (
    <Query query={USER_QUERY} variables={{ id: "ck70zble3mjr50b00pcff110s" }}>
      {({ data, loading, error }) => {
        console.log(data);
        console.log(error);
        return <p>I'm the User component!</p>;
      }}
    </Query>
  );
};

export default User;
