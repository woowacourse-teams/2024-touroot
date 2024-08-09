export const ERROR_MESSAGE_MAP = {
  api: {
    login: "로그인을 해주세요.",
    expiredToken: "이미 만료된 토큰입니다.",
    onlyWriter: "여행 계획 조회는 작성자만 가능합니다.",
  },
  loginFailed: "로그인에 실패하였습니다. 다시 시도해주세요!",
  imageUpload: "사진은 10장 이하만 업로드 해주세요.",
  provider: "provider 바깥에 존재합니다!",
} as const;
