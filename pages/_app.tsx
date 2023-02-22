import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

import { heyTheme } from '@/public/theme/theme';

const queryClient = new QueryClient();

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    try {
      if (!window.Kakao.isInitialized() && window.Kakao) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={heyTheme}>
        <Head>
          <title>Hey, cake</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Script src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"></Script>
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
