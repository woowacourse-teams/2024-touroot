import { MapPosition } from "@type/domain/common";

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
  shareKey: string;
}

export type TravelPlanPayload = Omit<TravelPlanResponse, "shareKey">;
