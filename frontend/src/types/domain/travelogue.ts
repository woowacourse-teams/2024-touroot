export interface Place {
  name: string;
  photoUrls?: string[];
  description?: string;
  position: {
    lat: number;
    lng: number;
  };
}

export interface TravelRegisterPlace {
  name: string;
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
