import React from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import { CURRENT_USER_QUERY } from "./User";

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

// TODO: Optimistic response for removal

class RemoveFromCart extends React.Component {
  update = (cache, payload) => {
    console.log(payload);
    // read the current user and their cart
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    console.log(data);
    // using the id in the mutation's payload, remove item from cart
    const cartItemId = payload.data.removeFromCart.id;
    data.currentUser.cart = data.currentUser.cart.filter(cartItem => cartItem.id !== cartItemId);
    // write newly updated cart to cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data })
  };
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        update={this.update}
        optimisticResponse={{
          __typename: "Mutation",
          removeFromCart: {
            __typename: "CartItem",
            id: this.props.id,
          }
        }}
      >
        {(removeFromCart) => {
          return <button onClick={removeFromCart}>Remove From Cart</button>;
        }}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
