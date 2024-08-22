import { useContext } from "react";
import { ErrorResponse, useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";

import { useMutation } from "@tanstack/react-query";

import { AuthTokenResponse } from "@type/domain/user";

import ApiError from "@apis/ApiError";
import { client } from "@apis/client";

import { SaveUserContext } from "@contexts/UserProvider";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

interface KakaoLoginPayload {
  code: string;
  encodedRedirectUri: string;
}

const usePostKakaoLogin = () => {
  const navigate = useNavigate();
  const { saveUser } = useContext(SaveUserContext);

  return useMutation<
    AxiosResponse<AuthTokenResponse, unknown>,
    ApiError | AxiosError<ErrorResponse>,
    KakaoLoginPayload,
    unknown
  >({
    mutationFn: ({ code, encodedRedirectUri }: KakaoLoginPayload) =>
      client.post(API_ENDPOINT_MAP.loginOauth(code, encodedRedirectUri)),
    onSuccess: (res) => {
      saveUser({
        accessToken: res.data.accessToken,
        memberId: res.data.memberId,
        refreshToken: res.data.refreshToken,
      });
      navigate(ROUTE_PATHS_MAP.root);
    },
    onError: () => {
      alert(ERROR_MESSAGE_MAP.loginFailed);
      navigate(ROUTE_PATHS_MAP.login);
    },
  });
};

export default usePostKakaoLogin;
