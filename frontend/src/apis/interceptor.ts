import * as Sentry from "@sentry/react";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

import { ErrorResponse } from "@type/api/error";
import { User } from "@type/domain/user";

import ApiError from "@apis/ApiError";

import { ROUTE_PATHS } from "@constants/route";

export const checkAccessToken = (
  config: InternalAxiosRequestConfig,
  accessToken: string | null,
) => {
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    window.location.href = ROUTE_PATHS.login;
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
  const user: User | null = JSON.parse(localStorage.getItem("tourootUser") ?? "{}");
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
