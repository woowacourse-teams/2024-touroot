import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

import MyLikes from "./MyLikes/MyLikes";
import MyTravelPlans from "./MyTravelPlans/MyTravelPlans";
import MyTravelogues from "./MyTravelogues/MyTravelogues";

export const TAB_CONTENT = [
  { label: "✈️ 내 여행 계획", component: MyTravelPlans },
  { label: "📝 내 여행기", component: MyTravelogues },
  { label: "❤️ 좋아요", component: MyLikes },
] as const;

export const IGNORED_ERROR_MESSAGES = [ERROR_MESSAGE_MAP.api.login, "Network Error"];
