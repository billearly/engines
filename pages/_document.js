import Document, { Head, Main, NextScript } from 'next/document';
import { createGlobalStyle, ServerStyleSheet } from 'styled-components';

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
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleElement = sheet.getStyleElement();

    return { ...page, styleElement };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <link href="https://fonts.googleapis.com/css?family=Pacifico|Roboto" rel="stylesheet"/>
          {this.props.styleElement}
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