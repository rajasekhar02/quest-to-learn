import axios from 'axios';
import CONSTANTS from './constants.json';
import localStore from '../../../utils/localStore';
// Set config defaults when creating the instance
export const unAuthAxios = axios.create({
  baseURL: `${CONSTANTS.PROXY_URL}/https://secure.splitwise.com/`,
});

export const authAxios = axios.create({
  baseURL: `${CONSTANTS.PROXY_URL}/https://secure.splitwise.com/api/v3.0`,
});
authAxios.interceptors.request.use((config) => {
  const splitwiseAuthPayload = localStore.getData(CONSTANTS.LOCAL_STORE_KEYS.splitwiseAuthPayload);
  if (!splitwiseAuthPayload?.accessToken) {
    throw new Error('Missing Authentication Keys');
  }
  config.headers.Authorization = `Bearer ${splitwiseAuthPayload.accessToken}`;
  return config;
});
authAxios.interceptors.response.use(({ data, status, statusText }) => ({
  data,
  status,
  statusText,
}));
export default {
  unAuthAxios,
  authAxios,
};
