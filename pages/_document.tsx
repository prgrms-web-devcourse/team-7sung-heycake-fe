import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import KAKAO_MAP_URL from '@/constants/KakaoConstants';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src={KAKAO_MAP_URL} strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
