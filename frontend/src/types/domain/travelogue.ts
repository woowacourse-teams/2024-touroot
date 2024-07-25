export interface Place {
  name: string;
  photoUrls: string[];
  description: string;
  position: {
    lat: string;
    lng: string;
  };
}

export interface Day {
  places: Place[];
}

export interface Travelogue {
  title: string;
  thumbnail: string;
  days: Day[];
}
