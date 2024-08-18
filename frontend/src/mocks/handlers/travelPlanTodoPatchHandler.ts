import { HttpResponse, http } from "msw";

import { isTestEnvironment } from "@constants/environment";

const apiRequestUrl = isTestEnvironment
  ? `/todos/:id`
  : `${process.env.REACT_APP_BASE_URL}todos/:id`;

export const travelPlanTodoPatchHandler = http.patch(apiRequestUrl, ({ request }) => {
  const pathname = new URL(request.url).pathname;

  const id = pathname.split("/").pop();

  return HttpResponse.json({ id }, { status: 200 });
});
