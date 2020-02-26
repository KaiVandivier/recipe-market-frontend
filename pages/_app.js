import App from "next/app";
import Page from "../components/Page";

// TODO: Include apollo

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
    const { Component, pageProps, /* apollo */ } = this.props;
    return (
      <Page>
        <Component {...pageProps} />
      </Page>
    )
  }
}

export default MyApp;
