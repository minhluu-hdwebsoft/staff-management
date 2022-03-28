import axios, { AxiosRequestConfig } from "axios";
import queryString from "query-string";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "",
  timeout: 1000,
  paramsSerializer: queryString.stringify,
};

const axiosClient = axios.create(axiosConfig);

export default axiosClient;
