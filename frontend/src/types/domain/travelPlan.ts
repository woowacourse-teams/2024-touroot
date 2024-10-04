import type { MapPosition } from "./common";

export interface TravelPlanTodo {
  id: number | string;
  content: string;
  order?: number;
  isChecked?: boolean;
}
export interface TravelPlanPlace {
  id: string;
  placeName: string;
  todos?: TravelPlanTodo[];
  position: MapPosition;
}

export interface TravelPlanDay {
  id: string;
  places: TravelPlanPlace[];
}

export interface TravelPlanResponse {
  id: string;
  shareKey: string;
  title: string;
  startDate: string;
  days: TravelPlanDay[];
}

export type TravelPlanPayload = Omit<TravelPlanResponse, "shareKey" | "id">;
