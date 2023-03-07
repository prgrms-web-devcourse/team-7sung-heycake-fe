// eslint-disable-next-line import/prefer-default-export
export const deleteAccessToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem('access_token');
  }

  return null;
};
