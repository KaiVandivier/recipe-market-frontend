import withApollo from "next-with-apollo";
import ApolloClient, { gql } from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";

const LOCAL_CART_STATE_QUERY = gql`
  query LOCAL_CART_STATE_QUERY {
    cartOpen @client
  }
`;

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          // enable CORS
          credentials: "include", 
        },
        headers
      })
    },
    clientState: {
      defaults: {
        cartOpen: false
      },
      resolvers: {
        Mutation: {
          toggleCart(_, args, { cache }, info) {
            // Get current state
            const { cartOpen } = cache.readQuery({ query: LOCAL_CART_STATE_QUERY })
            // Write new state to cache
            const data = { data: { cartOpen: !cartOpen }}
            cache.writeData(data)
            return data;
          }
        }
      }
    },
  })
}

export default withApollo(createClient);
