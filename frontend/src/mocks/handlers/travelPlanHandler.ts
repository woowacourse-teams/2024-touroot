import { HttpResponse, http } from "msw";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { isTestEnvironment } from "@constants/environment";

import { isUUID } from "@utils/uuid";

import TRAVEL_PLANS from "../data/travelPlan.json";

const apiRequestUrl = isTestEnvironment
  ? `${API_ENDPOINT_MAP.travelPlans}/:id`
  : `${process.env.REACT_APP_BASE_URL}${API_ENDPOINT_MAP.travelPlans.slice(1)}/:id`;

export const travelPlanHandler = http.get(apiRequestUrl, ({ request }) => {
  const pathname = new URL(request.url).pathname;

  const id = pathname.split("/").pop();

  if (isUUID(id ?? "")) {
    return HttpResponse.json(TRAVEL_PLANS[0]);
  }

  if (!Number.isNaN(Number(id))) {
    const plan = TRAVEL_PLANS.find((plan) => plan.id === parseInt(id ?? "") - 1);

    if (plan) {
      return HttpResponse.json(plan);
    }
  }

  return new HttpResponse(null, { status: 404, statusText: "Travel plan not found" });
});
