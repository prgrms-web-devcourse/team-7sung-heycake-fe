import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

import Header from '@/components/Header';
import heyTheme from '@/public/theme/theme';

const queryClient = new QueryClient();

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

function kakaoInit() {
  window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname === '/') {
    return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={heyTheme}>
          <Head>
            <title>Hey, cake</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, minimum-scale=1"
            />
          </Head>
          <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
            onLoad={kakaoInit}
          />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </ChakraProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={heyTheme}>
        <Head>
          <title>Hey, cake</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
          />
        </Head>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
          onLoad={kakaoInit}
        />
        <Header />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
