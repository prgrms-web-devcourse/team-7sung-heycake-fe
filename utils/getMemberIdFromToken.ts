import jwt from 'jsonwebtoken';

interface DecodedToken {
  [key: string]: any;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.decode(token);
    return decoded as DecodedToken;
  } catch (err) {
    throw Error();
  }
};

const getMemberIdFromToken = (token: string): string | null => {
  const decoded = decodeToken(token);
  return decoded?.memberId || null;
};

export default getMemberIdFromToken;
