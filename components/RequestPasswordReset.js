import React, { Component } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import Link from "next/link";
import Head from "next/head";
import Error from "./Error";
import Success from "./Success";
import Card from "./styles/Card";
import Form from "./styles/Form";
import Button from "./styles/Button";

const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation REQUEST_PASSWORD_RESET_MUTATION($email: String!) {
    requestPasswordReset(email: $email) {
      message
    }
  }
`;

class RequestPasswordReset extends Component {
  state = {
    email: "",
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
        mutation={REQUEST_PASSWORD_RESET_MUTATION}
        variables={this.state}
      >
        {(requestPasswordReset, { loading, error, called }) => {
          return (
            <Card>
              <Head>
                <title>Recipe Market! | Request Password Reset</title>
              </Head>

              <Form
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  requestPasswordReset();
                  this.setState({
                    email: "",
                  });
                }}
              >
                <h1>Request a Password Reset</h1>
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
                  <p>
                    Don't have an account yet?{" "}
                    <Link href="/signup">
                      <a>Click here to sign up</a>
                    </Link>
                  </p>
                  {!error && !loading && called && (
                    <Success
                      message={
                        "Check your email for a link to reset your password."
                      }
                    />
                  )}
                  <Button primary type="submit">
                    Request{loading ? "ing" : ""} Reset
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

export default RequestPasswordReset;
