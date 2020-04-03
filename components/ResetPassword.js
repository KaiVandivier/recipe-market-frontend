import React, { Component } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import Form from "./styles/Form";
import Error from "./Error";
import { CURRENT_USER_QUERY } from "./User";
import Button from "./styles/Button";
import Success from "./Success";

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($resetToken: String!, $password: String!) {
    resetPassword(resetToken: $resetToken, password: $password) {
      id
    }
  }
`;

class ResetPassword extends Component {
  state = {
    password: "",
    confirmPassword: ""
  };

  handleChange = e => {
    const { name, value, type } = e.target;
    this.setState({
      [name]: type === "number" ? Number(value) : value
    });
  };

  render() {
    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{
          password: this.state.password,
          resetToken: this.props.resetToken
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(resetPassword, { loading, error, called }) => {
          return (
            <Form
              method="post"
              onSubmit={e => {
                e.preventDefault();
                // TODO: validate password matching better
                if (this.state.password !== this.state.confirmPassword) return;
                resetPassword();
                this.setState({
                  password: "",
                  confirmPassword: ""
                });
              }}
            >
              <h1>Reset Password</h1>
              <Error error={error} />
              <fieldset aria-disabled={loading}>
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
                <label htmlFor="confirmPassword">
                  Confirm Password:
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                </label>
                {!error && !loading && called && (
                  <Success message={"Your password has been changed."} />
                )}
                <Button primary type="submit">
                  Reset{loading ? "ting" : ""} Password
                </Button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default ResetPassword;
