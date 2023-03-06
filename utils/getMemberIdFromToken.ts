import jwt from 'jsonwebtoken';

interface DecodedToken {
  [key: string]: any;
}

const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.decode(token);
    return decoded as DecodedToken;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getMemberIdFromToken = (token: string): string | null => {
  const decoded = decodeToken(token);
  return decoded?.memberId || null;
};

export default getMemberIdFromToken;
