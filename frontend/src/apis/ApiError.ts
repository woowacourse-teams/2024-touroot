import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

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

    if (errorStatus === HTTP_STATUS.BAD_REQUEST) {
      name = "ApiBadRequestError";
    }

    if (errorStatus === HTTP_STATUS.UNAUTHORIZED) {
      name = "ApiUnauthorizedError";
    }

    if (errorStatus === HTTP_STATUS.FORBIDDEN) {
      name = "ApiForbiddenError";
    }

    if (errorStatus === HTTP_STATUS.NOT_FOUND) {
      name = "ApiNotFoundError";
    }

    if (errorStatus === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
      name = "ApiInternalServerError";
    }

    this.name = name;
    this.stack = error.stack;
    this.config = error.config ?? ({} as InternalAxiosRequestConfig);
    this.code = error.code;
    this.request = error.request;
    this.response = error.response;
    this.isAxiosError = error.isAxiosError;
    this.toJSON = () => {
      return error.toJSON() as Record<string, unknown>;
    };
  }
}

export default ApiError;
