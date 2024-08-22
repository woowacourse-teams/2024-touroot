import * as Sentry from "@sentry/react";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import type { ErrorResponse } from "@type/api/errorResponse";
import type { AuthTokenResponse, UserResponse } from "@type/domain/user";

import ApiError from "@apis/ApiError";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { HTTP_STATUS_CODE_MAP } from "@constants/httpStatusCode";
import { ROUTE_PATHS_MAP } from "@constants/route";
import { STORAGE_KEYS_MAP } from "@constants/storage";

export const checkAccessToken = (
  config: InternalAxiosRequestConfig,
  accessToken: string | null,
) => {
  if (!accessToken) {
    alert(ERROR_MESSAGE_MAP.api.login);
    window.location.href = ROUTE_PATHS_MAP.login;
  }

  return config;
};

export const setAuthorizationHeader = (
  config: InternalAxiosRequestConfig,
  accessToken: string | null,
) => {
  if (!config.headers || config.headers.Authorization || !accessToken) return config;

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

export const handlePreviousRequest = (config: InternalAxiosRequestConfig) => {
  const user: UserResponse | null = JSON.parse(localStorage.getItem(STORAGE_KEYS_MAP.user) ?? "{}");
  let newConfig = { ...config };

  newConfig = checkAccessToken(config, user?.accessToken ?? null);
  newConfig = setAuthorizationHeader(config, user?.accessToken ?? "");

  return newConfig;
};

const handleUserLogout = () => {
  localStorage.removeItem(STORAGE_KEYS_MAP.user);
  alert(ERROR_MESSAGE_MAP.api.login);
  window.location.href = ROUTE_PATHS_MAP.login;
};

export const handleAPIError = async (error: AxiosError<ErrorResponse>) => {
  if (
    error.response?.status === HTTP_STATUS_CODE_MAP.UNAUTHORIZED &&
    error.response.data.message === ERROR_MESSAGE_MAP.api.expiredToken
  ) {
    try {
      const user: UserResponse | null = JSON.parse(
        localStorage.getItem(STORAGE_KEYS_MAP.user) ?? "{}",
      );

      axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

      const response: AxiosResponse<AuthTokenResponse> = await axios.post(
        API_ENDPOINT_MAP.reissueToken,
        { refreshToken: user?.refreshToken },
      );

      const { accessToken, refreshToken, memberId } = response.data;

      localStorage.setItem(
        STORAGE_KEYS_MAP.user,
        JSON.stringify({ memberId, accessToken, refreshToken }),
      );

      if (error.config && error.config.headers) {
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return axios.request(error.config);
      }
    } catch (refreshTokenError) {
      handleUserLogout();
    }
  }

  Sentry.withScope((scope: Sentry.Scope) => {
    if (!error.response) {
      scope.setLevel("error");
      Sentry.captureException(error);
      throw error;
    }

    const { data } = error.response;
    const apiError = new ApiError(error, data.message);

    scope.setLevel("error");
    Sentry.captureException(apiError);

    throw apiError;
  });
};
