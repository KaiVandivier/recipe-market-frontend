import Head from "next/head";

import React from "react";

const Meta = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      {/* TODO: Viewport */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        href="https://fonts.googleapis.com/css?family=Leckerli+One&display=swap"
        rel="stylesheet"
      />
      <title>Recipe Market!</title>
    </Head>
  );
};

export default Meta;
