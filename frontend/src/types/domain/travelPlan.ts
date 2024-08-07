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
  id: string;
  placeName: string;
  description?: string;
  position: MapPosition;
};

export interface TravelPlanDay {
  id: string;
  places: TravelPlanPlace[];
}

export interface TravelPlanResponse {
  title: string;
  startDate: string;
  days: TravelPlanDay[];
  shareKey: string;
}

export type TravelPlanPayload = Omit<TravelPlanResponse, "shareKey" | "id">;
