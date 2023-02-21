import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>Hey, cake</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          defer
          src="https://developers.kakao.com/sdk/js/kakao.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
