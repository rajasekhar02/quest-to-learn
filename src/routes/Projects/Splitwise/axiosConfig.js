import axios from "axios";
import CONSTANTS from "./constants.json";
import localStore from "../../../utils/localStore";
import SplitwiseAuthProvider from "./auth";
// Set config defaults when creating the instance
export const unAuthAxios = axios.create({
  baseURL: `${CONSTANTS.PROXY_URL}/https://secure.splitwise.com/`,
});

export const authAxios = axios.create({
  baseURL: `${CONSTANTS.PROXY_URL}/https://secure.splitwise.com/api/v3.0`,
});
authAxios.interceptors.request.use(function (config) {
  const splitwiseAuthPayload = localStore.getData(
    SplitwiseAuthProvider.LOCAL_STORE_KEY
  );
  if (!splitwiseAuthPayload?.accessToken) {
    throw new Error("Missing Authentication Keys");
  }
  config.headers.Authorization = `Bearer ${splitwiseAuthPayload.accessToken}`;
  return config;
});
authAxios.interceptors.response.use(function ({ data, status, statusText }) {
  return { data, status, statusText };
});
export default {
  unAuthAxios,
  authAxios,
};
