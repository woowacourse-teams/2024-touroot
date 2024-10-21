export interface MapPosition {
  lat: number;
  lng: number;
}

export interface PlaceInfo {
  placeName: string;
  position: MapPosition;
  countryCode: string;
}
