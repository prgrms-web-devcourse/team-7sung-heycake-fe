// eslint-disable-next-line import/prefer-default-export
export const deleteAccessToken = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('access_token');
  }
  return null;
};
