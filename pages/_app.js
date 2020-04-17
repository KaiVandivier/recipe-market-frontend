import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../lib/withData";
import Page from "../components/Page";
import "../public/nprogress.css";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // expose the page query to all the pages
    pageProps.query = ctx.query;
    return { pageProps }
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Page>
          <p>Hello!</p>
          {/* <Component {...pageProps} /> */}
        </Page>
      </ApolloProvider>
    )
  }
}

export default withData(MyApp);
