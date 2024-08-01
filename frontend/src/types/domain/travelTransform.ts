import { Place } from "@type/domain/travelogue";

export type TravelTransformPlaces = {
  places: Pick<Place, "description" | "placeName" | "position">[];
};

export type TravelTransformDetail = { days: TravelTransformPlaces[] };
