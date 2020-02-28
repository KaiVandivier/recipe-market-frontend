import Head from "next/head";

import React from 'react';

const Meta = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      {/* TODO: Viewport */}
      {/* TODO: Icon */}
      <link href='https://fonts.googleapis.com/css?family=Leckerli+One&display=swap' rel="stylesheet" /> 
      <title>Recipe Market!</title>
    </Head>
  );
};

export default Meta;