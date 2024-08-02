import * as Sentry from "@sentry/react";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

import type { ErrorResponse } from "@type/api/errorResponse";
import type { UserResponse } from "@type/domain/user";

import ApiError from "@apis/ApiError";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
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
  if (!config.headers || config.headers.Authorization) return config;

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

export const handlePreviousRequest = (config: InternalAxiosRequestConfig) => {
  const user: User | null = JSON.parse(localStorage.getItem(STORAGE_KEYS_MAP.user) ?? "{}");
  let newConfig = { ...config };

  newConfig = checkAccessToken(config, user?.accessToken ?? null);
  newConfig = setAuthorizationHeader(config, user?.accessToken ?? "");

  return newConfig;
};

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
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
