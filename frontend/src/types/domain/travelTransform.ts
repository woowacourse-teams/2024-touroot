import type { TravelPlanPlace } from "@type/domain/travelPlan";
import type { TraveloguePlace } from "@type/domain/travelogue";

export type TravelTransformPlace = Extract<TraveloguePlace, TravelPlanPlace>;

export interface TravelTransformDays {
  id: string;
  places: TravelTransformPlace[];
}

export type TravelTransformDetail = { days: TravelTransformDays[] };
