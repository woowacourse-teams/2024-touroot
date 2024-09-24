import { useMemo } from "react";

import type { TravelTransformPlaces } from "@type/domain/travelTransform";

import { useUserProfile } from "@queries/useUserProfile";

import getDaysAndNights from "@utils/getDaysAndNights";

type TravelRecordType = "travelogue" | "travelPlan";

type useInitialTravelTitleProps = {
  days: TravelTransformPlaces[] | undefined;
  type: TravelRecordType;
};

const useInitialTravelTitle = ({ days, type }: useInitialTravelTitleProps) => {
  const { data, status } = useUserProfile();

  return useMemo(() => {
    const daysAndNights = getDaysAndNights(days);

    const userPrefix = status === "success" ? `${data?.nickname}의 ` : "";
    const tripType = type === "travelogue" ? "여행기" : "여행 계획";

    if (days && days?.length >= 1) return `${userPrefix}${daysAndNights} ${tripType}`;
    return "";
  }, [days, data, status, type]);
};

export default useInitialTravelTitle;
