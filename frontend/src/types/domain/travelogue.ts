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
  id: number;
  title: string;
  thumbnail: string;
  days: TravelogueDay[];
  authorNickname: string;
  authorProfileUrl: string;
  authorId: number;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
}

export type TraveloguePayload = Pick<TravelogueResponse, "title" | "thumbnail" | "days">;

export interface MyTravelogue {
  id: string;
  thumbnailUrl: string;
  title: string;
  createdAt: string;
}
