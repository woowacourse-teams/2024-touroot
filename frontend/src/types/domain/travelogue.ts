import { MapPosition } from "@type/domain/common";

export interface TraveloguePlace {
  id: string;
  placeName: string;
  photoUrls?: string[];
  description?: string;
  position: MapPosition;
}

export interface TravelogueDay {
  id: string;
  places: TraveloguePlace[];
}

export interface Tag {
  id: number;
  tag: string;
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
  tags: Tag[];
}

export type TraveloguePayload = Pick<TravelogueResponse, "title" | "thumbnail"> & {
  tags: number[];
  days: {
    places: (Omit<TraveloguePlace, "photoUrls"> & { photoUrls?: ({ url: string } | string)[] })[];
  }[];
};

export interface MyTravelogue {
  id: string;
  thumbnailUrl: string;
  title: string;
  createdAt: string;
}

export type SearchType = "TITLE" | "AUTHOR";

export type SortingOption = "likeCount" | "createdAt";

export type TravelPeriodOption = "" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
