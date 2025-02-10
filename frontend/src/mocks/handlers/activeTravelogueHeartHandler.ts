import { HttpResponse, http } from "msw";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { isTestEnvironment } from "@constants/environment";

import TRAVELOGUES from "../data/travelogue.json";

const apiRequestUrl = isTestEnvironment
  ? `${API_ENDPOINT_MAP.travelogues}/:id/like`
  : `${process.env.REACT_APP_BASE_URL}${API_ENDPOINT_MAP.travelogues.slice(1)}/:id/like`;

export const activeTravelogueHeartHandler = http.post(apiRequestUrl, ({ params }) => {
  const { id } = params;

  const travelogue = TRAVELOGUES.find((travelogue) => travelogue.id === Number(id));

  if (!travelogue) {
    return new HttpResponse(null, { status: 404, statusText: "여행기가 없습니다." });
  }

  travelogue.isLiked = true;
  travelogue.likeCount += 1;

  return HttpResponse.json(
    {
      isLiked: travelogue.isLiked,
      likeCount: travelogue.likeCount,
    },
    { status: 200 },
  );
});
