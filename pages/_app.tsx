import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import type { AppProps } from 'next/app';
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
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Hey, cake</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          defer
          src="https://developers.kakao.com/sdk/js/kakao.js"
        ></script>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={heyTheme}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}
