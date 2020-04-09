import React, { Component } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import Link from "next/link";
import Head from "next/head";
import Error from "./Error";
import Success from "./Success";
import Button from "./styles/Button";
import Card from "./styles/Card";
import Form from "./styles/Form";

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(name: $name, email: $email, password: $password) {
      id
    }
  }
`;

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  handleChange = (e) => {
    const { name, value, type } = e.target;
    this.setState({
      [name]: type === "number" ? Number(value) : value,
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_USER_MUTATION} variables={this.state}>
        {(createUser, { loading, error, called }) => {
          if (error) return <Error error={error} />;
          return (
            <Card>
              <Head>
                <title>Recipe Market! | Sign Up</title>
              </Head>
              <Form
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: Include this in form validation
                  if (this.state.password !== this.state.confirmPassword)
                    return;
                  createUser();
                  this.setState({
                    email: "",
                    name: "",
                    password: "",
                    confirmPassword: "",
                  });
                }}
              >
                <h1>Make an Account</h1>
                <fieldset aria-disabled={loading}>
                  <label htmlFor="name">
                    User name:
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="User name"
                      required
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </label>
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
                  <p>
                    Already have an account?{" "}
                    <Link href="/signin">
                      <a>Click here to sign in</a>
                    </Link>
                  </p>
                  {!error && !loading && called && (
                    <Success message={"Account created!"} />
                  )}
                  <Button primary type="submit">
                    Mak{loading ? "ing" : "e"} Account
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

export default Signup;
