import { HttpResponse, http } from "msw";

import { API_ENDPOINT_MAP } from "@constants/endpoint";

export const travelPlanRegisterHandler = http.post(API_ENDPOINT_MAP.travelPlans, async () => {
  return HttpResponse.json({}, { status: 201 });
});
