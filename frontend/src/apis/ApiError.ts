import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { HTTP_STATUS_CODE_MAP } from "@constants/httpStatusCode";

class ApiError<T = unknown> extends Error implements AxiosError<T> {
  config: InternalAxiosRequestConfig;
  code?: string;
  request?: unknown;
  response?: AxiosResponse<T>;
  cause?: Error | undefined;
  isAxiosError: boolean;
  toJSON: () => Record<string, unknown>;

  constructor(error: AxiosError<T>, message?: string) {
    super(message ?? error.message);

    const errorStatus = error.response?.status || 0;
    let name = "ApiError";

    if (errorStatus === HTTP_STATUS_CODE_MAP.BAD_REQUEST) {
      name = "ApiBadRequestError";
    }

    if (errorStatus === HTTP_STATUS_CODE_MAP.UNAUTHORIZED) {
      name = "ApiUnauthorizedError";
    }

    if (errorStatus === HTTP_STATUS_CODE_MAP.FORBIDDEN) {
      name = "ApiForbiddenError";
    }

    if (errorStatus === HTTP_STATUS_CODE_MAP.NOT_FOUND) {
      name = "ApiNotFoundError";
    }

    if (errorStatus === HTTP_STATUS_CODE_MAP.INTERNAL_SERVER_ERROR) {
      name = "ApiInternalServerError";
    }

    this.name = name;
    this.config = error.config ?? ({} as InternalAxiosRequestConfig);
    this.code = error.code;
    this.request = error.request;
    this.response = error.response;
    this.isAxiosError = error.isAxiosError;
    this.toJSON = () => {
      return error.toJSON() as Record<string, unknown>;
    };

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export default ApiError;
