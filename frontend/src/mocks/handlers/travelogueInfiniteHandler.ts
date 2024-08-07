import { HttpResponse, http } from "msw";

import MOCK_TRAVELOGUES from "@mocks/data/travelogue.json";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { isTestEnvironment } from "@constants/environment";

const apiRequestUrl = isTestEnvironment
  ? `${API_ENDPOINT_MAP.travelogues}`
  : `${process.env.REACT_APP_BASE_URL}${API_ENDPOINT_MAP.travelogues.slice(1)}`;

export const travelogueInfiniteHandler = http.get(apiRequestUrl, ({ request }) => {
  const url = new URL(request.url);

  const page = Number(url.searchParams.get("page") ?? "5");
  const size = Number(url.searchParams.get("size") ?? "5");

  const start = page * size;
  const end = (page + 1) * size;

  const last = MOCK_TRAVELOGUES.length <= end;
  const paginatedPage = MOCK_TRAVELOGUES.slice(start, end);

  return HttpResponse.json({ content: paginatedPage, last });
});
