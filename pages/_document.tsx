import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1 maximum-scale=1"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
