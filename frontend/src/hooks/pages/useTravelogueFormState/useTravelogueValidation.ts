import { useCallback, useState } from "react";

import { TravelTransformDays } from "@type/domain/travelTransform";

import { FORM_ERROR_MESSAGE_MAP } from "@constants/errorMessage";

const useTravelogueValidation = (
  title: string,
  thumbnail: File | null,
  travelogueDays: TravelTransformDays[],
) => {
  const [errorMessages, setErrorMessages] = useState<{
    title?: string;
    thumbnail?: string;
    dates?: string;
    locations?: string;
  }>({});

  const validateTravelogue = useCallback(() => {
    const newErrorMessages: typeof errorMessages = {};

    // 제목 유효성 검사
    if (title.length === 0 || title.length > 20) {
      newErrorMessages.title = FORM_ERROR_MESSAGE_MAP.travelogue.invalidTitleLength;
    }

    // 썸네일 이미지 형식 검사 (간단한 예시, 실제로는 더 복잡할 수 있습니다)
    if (thumbnail && !thumbnail.type.startsWith("image/")) {
      newErrorMessages.thumbnail = FORM_ERROR_MESSAGE_MAP.travelogue.invalidImageFormat;
    }

    // 날짜 정보 검사
    if (travelogueDays.length === 0) {
      newErrorMessages.dates = FORM_ERROR_MESSAGE_MAP.travelogue.invalidDatesMissing;
    }

    // 장소 정보 검사
    const hasEmptyLocations = travelogueDays.some((day) => day.places.length === 0);
    if (hasEmptyLocations) {
      newErrorMessages.locations = FORM_ERROR_MESSAGE_MAP.travelogue.invalidLocationMissing;
    }

    setErrorMessages(newErrorMessages);

    return Object.keys(newErrorMessages).length === 0;
  }, [title, thumbnail, travelogueDays]);

  return {
    errorMessages,
    validateTravelogue,
  };
};

export default useTravelogueValidation;
