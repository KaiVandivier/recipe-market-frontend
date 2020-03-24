import React from 'react';
import Error from "./Error";
import { Query } from "@apollo/react-components";

function withQuery(Component, queryProps) {
  console.log(Component);
  console.log(queryProps);
  return props => {
    console.log(props);
    return (
    <Query {...queryProps} variables={props.variables}>
      {({ data, loading, error }) => {
        if (loading) return null;
        if (error) return <Error error={error} />
        return (
          <Component data={data} {...props} />
        )
      }}
    </Query>
  )};
};

export default withQuery;