import { useCallback, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import type { TravelPlanDay, TravelPlanPlace } from "@type/domain/travelPlan";
import type { TravelTransformPlaces } from "@type/domain/travelTransform";

export const useTravelPlanDays = (days: TravelTransformPlaces[]) => {
  const [travelPlanDays, setTravelPlanDays] = useState<TravelPlanDay[]>(days);

  const onAddDay = useCallback((dayIndex?: number) => {
    setTravelPlanDays((prevTravelDays) =>
      dayIndex
        ? Array.from({ length: dayIndex }, () => ({ id: uuidv4(), places: [] }))
        : [...prevTravelDays, { id: uuidv4(), places: [] }],
    );
  }, []);

  const onDeleteDay = (targetDayIndex: number) => {
    setTravelPlanDays((prevTravelDays) =>
      prevTravelDays.filter((_, dayIndex) => dayIndex !== targetDayIndex),
    );
  };

  const onAddPlace = (
    dayIndex: number,
    travelParams: Pick<TravelPlanPlace, "placeName" | "position">,
  ) => {
    setTravelPlanDays((prevTravelDays) => {
      const newTravelPlans = [...prevTravelDays];
      newTravelPlans[dayIndex].places.push({ ...travelParams, id: uuidv4() });
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
    newTravelPlans[dayIndex].places[placeIndex].description = e.target.value;
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
