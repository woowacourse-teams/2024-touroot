import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SaveUserContext } from "@contexts/UserProvider";

import { client } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { ROUTE_PATHS_MAP } from "@constants/route";

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const { saveUser } = useContext(SaveUserContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      client
        .get(API_ENDPOINT_MAP.loginOauth(code))
        .then((res) => {
          saveUser(res.data);
          navigate(ROUTE_PATHS_MAP.root);
        })
        .catch(() => {
          alert("로그인에 실패하였습니다. 다시 시도해주세요!");
          navigate(ROUTE_PATHS_MAP.login);
        });
    } else {
      alert("로그인에 실패하였습니다. 다시 시도해주세요!");
      navigate(ROUTE_PATHS_MAP.login);
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallbackPage;
