import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { heyTheme } from '@/public/theme/theme';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={heyTheme}>
        <Head>
          <title>Hey, cake</title>
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
