
import { TravelTransformDetail } from "./travelTransform";
import type { Place, TravelRegisterPlace } from "./travelogue";


export interface TravelPlan {
  id: string;
  shareKey: string;
  title: string;
  startDate: string;
  days: TravelTransformDetail["days"];
};

export type TravelPlanPlace = {
  placeName: string;
  description?: string;
  position: MapPosition;
};

export interface TravelPlanDay {
  places: TravelPlanPlace[];
}

export interface TravelPlanResponse {
  title: string;
  startDate: string;
  days: TravelPlanDay[];
}
