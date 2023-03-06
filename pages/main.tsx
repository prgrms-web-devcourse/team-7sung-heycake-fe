import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

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
