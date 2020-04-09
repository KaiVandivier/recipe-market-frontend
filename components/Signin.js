import React, { Component } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import Link from "next/link";
import Head from "next/Head";
import Error from "./Error";
import Success from "./Success";
import Button from "./styles/Button";
import Card from "./styles/Card";
import Form from "./styles/Form";
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

  handleChange = (e) => {
    const { name, value, type } = e.target;
    this.setState({
      [name]: type === "number" ? Number(value) : value,
    });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { loading, error, called }) => {
          return (
            <Card>
              <Head>
                <title>Recipe Market! | Sign In</title>
              </Head>
              <Form
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  signin();
                  this.setState({
                    email: "",
                    password: "",
                  });
                }}
              >
                <h1>Sign in to Your Account</h1>
                <Error error={error} />
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
                  <p>
                    Don't have an account yet?{" "}
                    <Link href="/signup">
                      <a>Click here to sign up</a>
                    </Link>
                  </p>
                  <p>
                    Forgot your password?{" "}
                    <Link href="/requestReset">
                      <a>Click here to reset it</a>
                    </Link>
                  </p>
                  {!error && !loading && called && (
                    <Success message={"You are now signed in!"} />
                  )}
                  <Button primary type="submit">
                    Sign{loading ? "ing" : ""} In
                  </Button>
                </fieldset>
              </Form>
            </Card>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
