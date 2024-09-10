import { HttpResponse, http } from "msw";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { isTestEnvironment } from "@constants/environment";

const apiRequestUrl = isTestEnvironment
  ? `${API_ENDPOINT_MAP.profile}`
  : `${process.env.REACT_APP_BASE_URL}${API_ENDPOINT_MAP.profile.slice(1)}`;

interface NicknameRequest {
  nickname: string;
}

export const modifyMemberNicknameHandler = http.put(apiRequestUrl, async ({ request }) => {
  const requestBody = (await request.json()) as NicknameRequest;
  const newNickname = requestBody.nickname;

  return HttpResponse.json(
    {
      success: true,
      message: `닉네임이 ${newNickname}으로 성공적으로 변경되었습니다.`,

      data: {
        nickname: newNickname,
      },
    },
    { status: 201 },
  );
});
