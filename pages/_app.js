import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../lib/withData";
import Page from "../components/Page";
import { gql } from "apollo-boost"; //
import { Query } from "@apollo/react-components"; //
import { CURRENT_USER_QUERY } from "../components/User";
import "../public/nprogress.css";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // expose the page query to all the pages
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <p>Hello!</p>

        <Query
          query={CURRENT_USER_QUERY}
        >
          {({ loading }) => <p>Query is {loading ? "loading" : "done"}</p>}
        </Query>

        {/* <Page> */}
        {/* <Component {...pageProps} /> */}
        {/* </Page> */}
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
