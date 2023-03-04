interface TokenResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  refresh_token_expires_in: string;
  scope: string;
}

async function getTokenFromKakao(authCode: string | string[]) {
  const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${authCode}`;
  const response: TokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
  return response;
}

const handler = async (authCode: string | string[]) => {
  const tokenResponse = await getTokenFromKakao(authCode);
  return tokenResponse;
};

export default handler;
