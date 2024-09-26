export const ERROR_MESSAGE_MAP = {
  api: {
    login: "로그인을 해주세요.",
    expiredToken: "이미 만료된 토큰입니다.",
    travelPlanOnlyWriter: "여행 계획 조회는 작성자만 가능합니다.",
    travelogueEditOnlyWriter: "여행기 수정은 작성자만 가능합니다.",
    travelPlanEditOnlyWriter: "여행 계획 수정은 작성자만 가능합니다.",
    travelPlanNotFound: "존재하지 않는 여행 계획입니다.",
  },
  loginFailed: "로그인에 실패하였습니다. 다시 시도해주세요!",
  imageUpload: "사진은 10장 이하만 업로드 해주세요.",
  provider: "provider 바깥에 존재합니다!",
  network: "네트워크 오류가 발생했어요. 잠시 후 다시 이용해 주세요!",
  imageConvert: "이미지를 변환하는데 에러가 발생했습니다. 다시 시도해주세요!",
} as const;
