import { Flex, IconButton } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { LoginIcon, UserIcon } from '@/public/icon';
import { getAccessToken } from '@/utils/getAccessToken';

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const { code } = router.query;

  useEffect(() => {
    const user = getAccessToken();
    if (user) {
      setIsLogin(true);
    }
  }, [code]);

  return (
    <Flex>
      <Flex
        alignItems="center"
        bg="white"
        width="100%"
        justifyContent="space-between"
        p={2}
      >
        <Link href="/main">
          <Image src="/images/logo.png" alt="로고" width={40} height={40} />
        </Link>
        <Flex gap="10px">
          {isLogin ? (
            <Link href="/mypage">
              <IconButton
                variant="ghost"
                aria-label="유저"
                icon={<UserIcon w={8} h={8} />}
              />
            </Link>
          ) : (
            <Link href="/">
              <IconButton
                variant="ghost"
                aria-label="로그인"
                icon={<LoginIcon w={8} h={8} />}
              />
            </Link>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
