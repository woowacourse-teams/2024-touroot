import { PlaceInfo } from "@type/domain/common";

export interface TraveloguePlace extends PlaceInfo {
  id: string;
  photoUrls?: string[];
  description?: string;
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

export interface MyLikes {
  id: string;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  authorName: string;
  authorProfileImageUrl: string;
}

export type SearchType = "TITLE" | "AUTHOR" | "COUNTRY";

export type SortingOption = "likeCount" | "createdAt";

export type TravelPeriodOption = "" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
