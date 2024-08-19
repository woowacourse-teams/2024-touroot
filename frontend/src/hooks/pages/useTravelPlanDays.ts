import { useCallback, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import type { TravelPlanDay, TravelPlanPlace } from "@type/domain/travelPlan";
import type { TravelTransformPlaces } from "@type/domain/travelTransform";

export const useTravelPlanDays = (days: TravelTransformPlaces[]) => {
  const [travelPlanDays, setTravelPlanDays] = useState<TravelPlanDay[]>(days);

  const onChangeTravelPlanDays = (newDays: TravelPlanDay[]) => {
    setTravelPlanDays(newDays);
  };

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

  const onChangeContent = ({
    content,
    dayIndex,
    placeIndex,
    todoId,
  }: {
    content: string;
    dayIndex: number;
    placeIndex: number;
    todoId: string;
  }) => {
    setTravelPlanDays((prevTravelPlansDays) => {
      const newTravelPlans = [...prevTravelPlansDays];
      const place = newTravelPlans[dayIndex]?.places[placeIndex];
      if (!place?.todos) return prevTravelPlansDays;

      const todoIndex = place.todos.findIndex((todo) => todo.id === todoId);
      if (todoIndex === -1) return prevTravelPlansDays;

      place.todos = place.todos.map((todo, index) =>
        index === todoIndex ? { ...todo, content } : todo,
      );

      return newTravelPlans;
    });
  };

  const onAddPlaceTodo = (dayIndex: number, placeIndex: number) => {
    setTravelPlanDays((prevTravelPlansDays) => {
      const newTravelPlans = [...prevTravelPlansDays];
      const place = newTravelPlans[dayIndex]?.places[placeIndex];
      if (!place) return prevTravelPlansDays;

      place.todos = [...(place.todos ?? []), { id: uuidv4(), content: "", checked: false }];

      return newTravelPlans;
    });
  };

  const onDeletePlaceTodo = (dayIndex: number, placeIndex: number, todoId: string) => {
    setTravelPlanDays((prevTravelPlanDays) => {
      const newTravelPlans = [...prevTravelPlanDays];
      const place = newTravelPlans[dayIndex]?.places[placeIndex];
      if (!place?.todos) return prevTravelPlanDays;

      place.todos = place.todos.filter((todo) => todo.id !== todoId);

      return newTravelPlans;
    });
  };

  return {
    travelPlanDays,
    onChangeTravelPlanDays,
    onAddDay,
    onDeleteDay,
    onAddPlace,
    onDeletePlace,
    onChangeContent,
    onAddPlaceTodo,
    onDeletePlaceTodo,
  };
};
