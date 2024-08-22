import { HttpResponse, http } from "msw";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { isTestEnvironment } from "@constants/environment";

import { extractLastPath } from "@utils/extractId";
import { isUUID } from "@utils/uuid";

import TRAVEL_PLANS from "../data/travelPlan.json";

const apiRequestUrl = isTestEnvironment
  ? `${API_ENDPOINT_MAP.travelPlans}/shared/:id`
  : `${process.env.REACT_APP_BASE_URL}${API_ENDPOINT_MAP.travelPlans.slice(1)}/shared/:id`;

export const travelPlanSharedDetailHandler = http.get(apiRequestUrl, ({ request }) => {
  const pathname = new URL(request.url).pathname;

  const id = extractLastPath(pathname);

  if (id && isUUID(id)) {
    const travelPlan = TRAVEL_PLANS.find((plan) => plan.shareKey === (id ?? ""));

    if (travelPlan) {
      return HttpResponse.json(travelPlan);
    }
    return;
  }

  return HttpResponse.json({}, { status: 404 });
});
