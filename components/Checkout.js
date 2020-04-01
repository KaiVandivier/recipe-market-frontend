import React from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import { loadStripe } from "@stripe/stripe-js";
import { stripePublicKey } from "../config";

const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION {
    checkout {
      sessionId
    }
  }
`;

const Checkout = () => {
  return (
    <Mutation mutation={CHECKOUT_MUTATION}>
      {(checkout, { loading, error, called }) => {
        return (
          <button
            onClick={async () => {
              const res = await checkout();
              const { sessionId } = res.data.checkout;

              const stripe = await loadStripe(stripePublicKey);
              const { error } = await stripe.redirectToCheckout({ sessionId });
              // If `redirectToCheckout` fails due to a browser or network error, display the localized error message to your customer using `error.message`.
              if (error) alert(error.message);
            }}
          >
            Check Out
          </button>
        );
      }}
    </Mutation>
  );
};

export default Checkout;
