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

export const FORM_ERROR_MESSAGE_MAP = {
  /**
   * [여행기 유효성 검증 항목]
   * 1. 제목을 입력하지 않은 경우
   * 2. 이미지 형식을 잘못 올린 경우
   * 3. 여행 계획 날짜 정보를 추가하지 않은 경우
   * 4. 여행 계획 날짜에 대한 장소 정보를 추가하지 않은 경우
   */
  travelogue: {
    invalidTitleLength: "여행기 제목은 1 ~ 20자 이내로 입력해주세요.",
    invalidImageFormat: "이미지 형식이 잘못되었습니다. 다시 업로드 해주세요.",
    invalidDatesMissing: "여행기 날짜 정보를 추가해주세요.",
    invalidLocationMissing: "여행기 날짜에 대한 장소 정보를 추가해주세요.",
  },
  /**
   * [여행 계획 유효성 검증 항목]
   * 1. 제목을 입력하지 않은 경우
   * 2. 제목이 1 ~ 20자 이내가 아닌 경우
   * 3. 시작일을 입력하지 않은 경우
   * 4. 시작일을 지난 날짜로 입력한 경우
   * 5. 여행 계획 날짜 정보를 추가하지 않은 경우
   * 6. 여행 계획 날짜에 대한 장소 정보를 추가하지 않은 경우
   * 7. 여행 계획을 1 ~ 20자 이내로 입력한 경우
   */
  travelPlan: {
    invalidTitleLength: "여행 계획 제목은 1 ~ 20자 이내로 입력해주세요.",
    invalidStartDatePast: "시작일은 현재를 기준으로 입력해주세요.",
    invalidStartDateMissing: "시작일을 추가해주세요.",
    invalidDatesMissing: "여행 계획 날짜 정보를 추가해주세요.",
    invalidLocationMissing: "여행 계획 날짜에 대한 장소 정보를 추가해주세요.",
    invalidPlanLength: "여행 계획은 1 ~ 20자 이내로 입력해주세요.",
  },
} as const;
