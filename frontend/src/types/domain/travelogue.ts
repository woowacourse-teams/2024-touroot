import { MapPosition } from "@type/domain/common";

export type TraveloguePlace = {
  placeName: string;
  photoUrls?: string[];
  description?: string;
  position: MapPosition;
};

export interface TravelogueDay {
  places: TraveloguePlace[];
}

export interface TravelogueResponse {
  title: string;
  thumbnail: string;
  days: TravelogueDay[];
}

export interface MyTravelogue {
  id: string;
  thumbnailUrl: string;
  title: string;
  createdAt: string;
}
