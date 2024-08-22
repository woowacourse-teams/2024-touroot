import { TravelPlanPlace } from "@type/domain/travelPlan";
import { TraveloguePlace } from "@type/domain/travelogue";

export type TravelTransformPlace = Pick<
  TravelPlanPlace | TraveloguePlace,
  keyof TravelPlanPlace & keyof TraveloguePlace
>;

export interface TravelTransformPlaces {
  id: string;
  places: TravelTransformPlace[];
}

export type TravelTransformDetail = { days: TravelTransformPlaces[] };
