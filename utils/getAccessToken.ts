const storage = window.localStorage;

// eslint-disable-next-line import/prefer-default-export
export const getAccessToken = () => storage.getItem('access_token');
