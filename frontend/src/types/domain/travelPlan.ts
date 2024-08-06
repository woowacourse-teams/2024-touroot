import { TravelTransformDetail } from "./travelTransform";
import type { Place, TravelRegisterPlace } from "./travelogue";

export interface TravelRegisterDay {
  places: TravelRegisterPlace[];
}

export interface TravelRegister {
  title: string;
  thumbnail: string;
  days: TravelRegisterDay[];
}

export interface Day {
  places: Place[];
}

export interface TravelPlan {
  id: string;
  shareKey: string;
  title: string;
  startDate: string;
  days: TravelTransformDetail["days"];
}
