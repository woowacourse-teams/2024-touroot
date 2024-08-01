export interface Place {
  placeName: string;
  photoUrls?: string[];
  description?: string;
  position: {
    lat: number;
    lng: number;
  };
}

export interface TravelRegisterPlace {
  placeName: string;
  photoUrls?: { url: string }[];
  description?: string;
  position: {
    lat: number;
    lng: number;
  };
}

export interface TravelRegisterDay {
  places: TravelRegisterPlace[];
}

export interface TravelRegister {
  title: string;
  thumbnail: string;
  days: TravelRegisterDay[];
}

export interface Day {
  places: Place[];
}

export interface Travelogue {
  title: string;
  thumbnail: string;
  days: Day[];
}

export type TravelTransformPlaces = {
  places: Pick<Place, "description" | "placeName" | "position">[];
};

export type TravelTransformDetail = { days: TravelTransformPlaces[] };
