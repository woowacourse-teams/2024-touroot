import type { TravelTransformPlaces } from "@type/domain/travelTransform";

const getDaysAndNights = (days: TravelTransformPlaces[] | undefined) =>
  days?.length && days?.length > 1 ? `${days.length - 1}박 ${days.length}일` : "당일치기";

export default getDaysAndNights;
