import jwt from 'jsonwebtoken';

import { Roles } from '@/types/role';

interface DecodedToken {
  [key: string]: any;
}

const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.decode(token);
    return decoded as DecodedToken;
  } catch (err) {
    throw Error();
  }
};

export const getMemberIdFromToken = (token: string): number | null => {
  const decoded = decodeToken(token);
  return decoded?.memberId || null;
};

export const getRoleFromToken = (token: string): Roles | null => {
  const decoded = decodeToken(token);
  return decoded?.roles[0] || null;
};
