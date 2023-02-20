import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { heyTheme } from '@/public/theme/theme';

import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={heyTheme}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
