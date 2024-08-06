import { useCallback, useState } from "react";

import type { TravelPlanDay, TravelPlanPlace } from "@type/domain/travelPlan";
import type { TravelTransformPlaces } from "@type/domain/travelTransform";

const MIN_DESCRIPTION_LENGTH = 0;
const MAX_DESCRIPTION_LENGTH = 300;

export const useTravelPlanDays = (days: TravelTransformPlaces[]) => {
  const [travelPlanDays, setTravelPlanDays] = useState<TravelPlanDay[]>(days);

  const onAddDay = useCallback((dayIndex?: number) => {
    setTravelPlanDays((prevTravelDays) =>
      dayIndex
        ? Array.from({ length: dayIndex }, () => ({ places: [] }))
        : [...prevTravelDays, { places: [] }],
    );
  }, []);

  const onDeleteDay = (targetDayIndex: number) => {
    setTravelPlanDays((prevTravelDays) =>
      prevTravelDays.filter((_, dayIndex) => dayIndex !== targetDayIndex),
    );
  };

  const onAddPlace = (dayIndex: number, travelParams: TravelPlanPlace) => {
    setTravelPlanDays((prevTravelDays) => {
      const newTravelPlans = [...prevTravelDays];
      newTravelPlans[dayIndex].places.push(travelParams);
      return newTravelPlans;
    });
  };

  const onDeletePlace = (dayIndex: number, placeIndex: number) => {
    setTravelPlanDays((prevTravelDays) => {
      const newTravelPlans = [...prevTravelDays];
      newTravelPlans[dayIndex] = {
        ...newTravelPlans[dayIndex],
        places: newTravelPlans[dayIndex].places.filter((_, index) => index !== placeIndex),
      };

      return newTravelPlans;
    });
  };

  const onChangePlaceDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    dayIndex: number,
    placeIndex: number,
  ) => {
    const newTravelPlans = [...travelPlanDays];
    newTravelPlans[dayIndex].places[placeIndex].description = e.target.value.slice(
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    );
    setTravelPlanDays(newTravelPlans);
  };

  return {
    travelPlanDays,
    onAddDay,
    onDeleteDay,
    onAddPlace,
    onDeletePlace,
    onChangePlaceDescription,
  };
};
