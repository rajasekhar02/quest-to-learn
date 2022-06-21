import axios from "axios";
import CONSTANTS from "./constants.json";
import localStore from "utils/localStore";
// Set config defaults when creating the instance
export const authAxios = axios.create({
  baseURL: `https://graphql.contentful.com/content/v1/spaces/${CONSTANTS.SPACE_ID}/environments/${CONSTANTS.ENVIRONMENT}`,
});
authAxios.interceptors.request.use(function (config) {
  // const contentfulCreds = CONSTANTS.CONTENT_DELIVERY_SECRET;
  config.headers.Authorization = `Bearer ${CONSTANTS.CONTENT_DELIVERY_SECRET}`;
  return config;
});
authAxios.interceptors.response.use(function ({ data, status, statusText }) {
  return { data, status, statusText };
});
export default {
  authAxios,
};
