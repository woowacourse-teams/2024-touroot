import { HttpResponse, http } from "msw";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { isTestEnvironment } from "@constants/environment";

import TRAVELOGUES from "../data/travelogue.json";

const apiRequestUrl = isTestEnvironment
  ? `${API_ENDPOINT_MAP.travelogues}/:id`
  : `${process.env.REACT_APP_BASE_URL}${API_ENDPOINT_MAP.travelogues.slice(1)}/:id`;

export const travelogueDetailHandler = http.get(apiRequestUrl, ({ request }) => {
  const pathname = new URL(request.url).pathname;

  const id = pathname.split("/").pop();

  if (!Number.isNaN(Number(id))) {
    const travelogue = TRAVELOGUES.find((travelogue) => travelogue.id === parseInt(id ?? ""));

    if (travelogue) {
      return HttpResponse.json(travelogue);
    }

    return;
  }

  return new HttpResponse(null, { status: 404, statusText: "잘못된 접근 입니다." });
});
