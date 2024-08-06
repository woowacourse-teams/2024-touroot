import type { MapPosition } from "./common";
import type { TravelTransformDetail } from "./travelTransform";

export interface TravelPlanResponse {
  id: string;
  shareKey: string;
  title: string;
  startDate: string;
  days: TravelTransformDetail["days"];
}

export type TravelPlanPlace = {
  placeName: string;
  description?: string;
  position: MapPosition;
};

export interface TravelPlanDay {
  places: TravelPlanPlace[];
}
