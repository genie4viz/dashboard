import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document<{ styleTags: any }> {
  public render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </Head>
        <body id="root">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
