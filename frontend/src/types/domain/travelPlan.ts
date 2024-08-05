import { MapPosition } from "@type/domain/common";

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
}
