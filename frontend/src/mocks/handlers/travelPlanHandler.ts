import { HttpResponse, http } from "msw";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { isTestEnvironment } from "@constants/environment";

import { extractLastPath } from "@utils/extractId";

import TRAVEL_PLANS from "../data/travelPlan.json";

const apiRequestUrl = isTestEnvironment
  ? `${API_ENDPOINT_MAP.travelPlans}/:id`
  : `${process.env.REACT_APP_BASE_URL}${API_ENDPOINT_MAP.travelPlans.slice(1)}/:id`;

export const travelPlanHandler = http.get(apiRequestUrl, ({ request }) => {
  const pathname = new URL(request.url).pathname;

  const id = extractLastPath(pathname);

  if (!Number.isNaN(Number(id))) {
    const plan = TRAVEL_PLANS.find((plan) => plan.id === parseInt(id ?? ""));

    if (plan) {
      return HttpResponse.json(plan);
    }
    return;
  }

  return new HttpResponse(null, { status: 404, statusText: "잘못된 접근 입니다." });
});
