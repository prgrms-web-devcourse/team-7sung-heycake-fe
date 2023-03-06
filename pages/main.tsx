import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import getCakeList from '@/components/Api/Main';
import CakeMain from '@/components/Main/cake/cakeMain';

interface ResponseType {
  accessToken: string;
  refreshToken: string;
}

export default function Main() {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  const loginHandler = useCallback(
    async (currCode: string | string[]) => {
      const response: ResponseType = await fetch(
        'https://heycake.kro.kr/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: currCode,
          }),
        }
      ).then((res) => res.json());

      if (response) {
        if (!localStorage.getItem('access_token')) {
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
        }
        router.push('/main');
      } else {
        router.push('/');
      }
    },
    [router]
  );

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode);
    } else if (kakaoServerError) {
      router.push('/');
    }
  }, [loginHandler, authCode, kakaoServerError, router]);
  return <CakeMain />;
}

export async function getServerSideProps() {
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
      staleTime: 10000,
    }
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
