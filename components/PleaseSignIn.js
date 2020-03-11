import React from 'react';
import User from "./User";
import Signin from "./Signin";

const PleaseSignIn = ({ children }) => {
  return (
    <User>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (!data.currentUser) {
          return (
            <div>
              <p>Please sign in before continuing:</p>
              <Signin />
            </div>
          );
        }
        return children;
      }}
    </User>
  );
};

export default PleaseSignIn;