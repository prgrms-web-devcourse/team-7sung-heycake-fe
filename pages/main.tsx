import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import CakeMain from '@/components/Main/cake/cakeMain';

interface ResponseType {
  ok: boolean;
  error?: any;
}
export default function Main() {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  const loginHandler = useCallback(
    async (currCode: string | string[]) => {
      const response: ResponseType = await fetch(
        'https://heycake.kro.kr/login/oauth2/code/kakao',
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

      if (response.ok) {
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
