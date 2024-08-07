import { MapPosition } from "@type/domain/common";

export type TraveloguePlace = {
  id: string;
  placeName: string;
  photoUrls?: string[];
  description?: string;
  position: MapPosition;
};

export interface TravelogueDay {
  id: string;
  places: TraveloguePlace[];
}

export interface TravelogueResponse {
  title: string;
  thumbnail: string;
  days: TravelogueDay[];
}
