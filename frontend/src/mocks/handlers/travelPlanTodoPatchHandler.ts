import { HttpResponse, http } from "msw";

import { isTestEnvironment } from "@constants/environment";

import { extractLastPath } from "@utils/extractId";

const apiRequestUrl = isTestEnvironment
  ? `/todos/:id`
  : `${process.env.REACT_APP_BASE_URL}todos/:id`;

export const travelPlanTodoPatchHandler = http.patch(apiRequestUrl, ({ request }) => {
  const pathname = new URL(request.url).pathname;

  const id = extractLastPath(pathname);

  return HttpResponse.json({ id }, { status: 200 });
});
