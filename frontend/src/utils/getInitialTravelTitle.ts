import type { TravelTransformDays } from "@type/domain/travelTransform";

import getDaysAndNights from "@utils/getDaysAndNights";

type TravelRecordType = "travelogue" | "travelPlan";

interface getInitialTravelTitleProps {
  days: TravelTransformDays[] | undefined;
  type: TravelRecordType;
}

const getInitialTravelTitle = ({ days, type }: getInitialTravelTitleProps) => {
  const daysAndNights = getDaysAndNights(days);

  const tripType = type === "travelogue" ? "여행기" : "여행 계획";

  if (days && days?.length >= 1) return `${daysAndNights} ${tripType}`;
  return "";
};

export default getInitialTravelTitle;
