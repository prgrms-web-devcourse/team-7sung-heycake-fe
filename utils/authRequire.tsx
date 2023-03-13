import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

import { getAccessToken } from './getAccessToken';
import { getRoleFromToken } from './getDecodeToken';

interface AuthRequiredProps {
  children: ReactNode;
}

// eslint-disable-next-line react/function-component-definition
const AuthRequired: FC<AuthRequiredProps> = ({ children }) => {
  const router = useRouter();
  const token =
    typeof window !== 'undefined' ? (getAccessToken() as string) : '';

  useEffect(() => {
    const role = getRoleFromToken(token);
    if (token === '' || role !== 'ROLE_ADMIN') {
      router.replace('/main');
    }
  }, [router, token]);

  return <Box>{children}</Box>;
};

export default AuthRequired;
