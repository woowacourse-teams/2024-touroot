import { useMemo } from "react";

import type { TravelTransformPlaces } from "@type/domain/travelTransform";

import { useUserProfile } from "@queries/useUserProfile";

import getDaysAndNights from "@utils/getDaysAndNights";

type TripRecordType = "travelogue" | "travelPlan";

type useInitialTripTitleProps = {
  days: TravelTransformPlaces[] | undefined;
  type: TripRecordType;
};

const useInitialTripTitle = ({ days, type }: useInitialTripTitleProps) => {
  const { data, status } = useUserProfile();

  return useMemo(() => {
    const daysAndNights = getDaysAndNights(days);

    const userPrefix = status === "success" ? `${data?.nickname}의 ` : "";
    const tripType = type === "travelogue" ? "여행기" : "여행 계획";

    return `${userPrefix}${daysAndNights} ${tripType}`;
  }, [days, data, status, type]);
};

export default useInitialTripTitle;
