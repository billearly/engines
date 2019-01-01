import Document, { Head, Main, NextScript } from 'next/document';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }
  p, h2 {
    margin: 0;
  }
`;

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <link href="https://fonts.googleapis.com/css?family=Pacifico|Roboto" rel="stylesheet"/>
        </Head>

        <body>
          <Main />
          <NextScript />
          <GlobalStyle />
        </body>
      </html>
    );
  }
};