import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import getCakeList from '@/components/Api/Main';
import CakeMain from '@/components/Main';
import useHandleAxiosError from '@/hooks/useHandleAxiosError';
import { getAccessToken } from '@/utils/getAccessToken';

interface ResponseType {
  accessToken: string;
  refreshToken: string;
}

export default function Main() {
  const router = useRouter();
  const { code: authCode } = router.query;
  const handleAxiosError = useHandleAxiosError();

  const handleLogin = useCallback(
    async (code: string) => {
      try {
        const response: ResponseType = await axios
          .post(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, { code })
          .then((res) => res.data);

        if (!getAccessToken()) {
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
        }

        router.push('/main');
      } catch (error) {
        handleAxiosError(error);
      }
    },
    [handleAxiosError, router]
  );

  useEffect(() => {
    if (authCode) {
      handleLogin(authCode as string);
    }
  }, [authCode, handleLogin]);

  return <CakeMain />;
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  const location = '강남구';

  await queryClient.prefetchInfiniteQuery(
    ['전체 케이크 리스트', '', location],
    () =>
      getCakeList({
        location,
        category: '',
        cursor: '',
      }),
    {
      staleTime: 1000 * 60 * 1,
    }
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      revalidate: 20,
      fallback: true,
    },
  };
};
