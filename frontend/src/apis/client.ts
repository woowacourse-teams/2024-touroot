import axios from "axios";

import { handleAPIError, handlePreviousRequest } from "@apis/interceptor";

export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const authClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

authClient.interceptors.request.use(handlePreviousRequest);
authClient.interceptors.response.use((response) => response, handleAPIError);

client.interceptors.response.use((response) => response, handleAPIError);
