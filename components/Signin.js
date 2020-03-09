import React, { Component } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import Form from "./styles/Form";
import Error from "./Error";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

class Signin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = e => {
    const { name, value, type } = e.target;
    this.setState({
      [name]: (type === "number") ? Number(value) : value
    })
  };

  render() {
    return (
      <Mutation mutation={SIGNIN_MUTATION} variables={this.state} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signin, { loading, error, called }) => {
          return (
            <Form method="post" onSubmit={(e) => {
              e.preventDefault();
              signin();
              this.setState({
                email: "",
                password: "", 
              });
            }}>
              <h1>Sign in to Your Account</h1>
              <Error error={error} />
              {!error && !loading && called && (
                <h3>Signed in successfully!</h3>
              )}
              <fieldset aria-disabled={loading}>
                <label htmlFor="email">
                  Email:
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="password">
                  Password:
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit">Sign{loading ? "ing" : ""} In</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
