import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import getCakeList from '@/components/Api/Main';
import CakeMain from '@/components/Main';
import { getAccessToken } from '@/utils/getAccessToken';

interface ResponseType {
  accessToken: string;
  refreshToken: string;
}

interface ErrorResponse {
  message?: string;
}

export default function Main() {
  const router = useRouter();
  const { code: authCode } = router.query;

  const handleLogin = useCallback(
    async (code: string) => {
      try {
        const response: ResponseType = await axios
          .post('https://heycake.kro.kr/login', { code })
          .then((res) => res.data);

        if (!getAccessToken()) {
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
        }

        router.push('/main');
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (!axiosError.response) return;

        if (axiosError.response.status === 401) {
          alert(axiosError.message || '인증되지 않은 요청입니다.');
        }
        console.error(error);
      }
    },
    [router]
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
      staleTime: 20000,
    }
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      revalidate: 20,
      fallback: false,
    },
  };
};
