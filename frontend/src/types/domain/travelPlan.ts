import type { MapPosition } from "./common";
import type { TravelTransformDetail } from "./travelTransform";

export interface TravelPlanTodo {
  id: number | string;
  content: string;
  order?: number;
  checked?: boolean;
}
export interface TravelPlanPlace {
  id: string;
  placeName: string;
  description?: string;
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
  days: TravelTransformDetail["days"];
}

export type TravelPlanPayload = Omit<TravelPlanResponse, "shareKey" | "id">;
