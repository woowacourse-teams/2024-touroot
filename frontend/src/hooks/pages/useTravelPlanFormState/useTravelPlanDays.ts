import { useCallback } from "react";

import { produce } from "immer";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";

import type { TravelPlanDay, TravelPlanPlace } from "@type/domain/travelPlan";
import type { TravelTransformDays } from "@type/domain/travelTransform";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

const transformTravelPlanDays = (travelTransformDays: TravelTransformDays[]) =>
  produce(travelTransformDays, (newTravelTransformDays) => {
    newTravelTransformDays.forEach(
      (day) => (day.places = day.places.map((place) => ({ ...place, todos: [] }))),
    );
  });

export const useTravelPlanDays = (days: TravelTransformDays[]) => {
  const [travelPlanDays, setTravelPlanDays] = useImmer<TravelPlanDay[]>(() =>
    transformTravelPlanDays(days),
  );

  const handleChangeTravelPlanDays = useCallback(
    (newDays: TravelPlanDay[]) => {
      setTravelPlanDays(newDays);
    },
    [setTravelPlanDays],
  );

  const handleAddDay = useCallback(() => {
    setTravelPlanDays((previousTravelPlanDays) => {
      previousTravelPlanDays.push({ id: uuidv4(), places: [] });
    });
  }, [setTravelPlanDays]);

  const handleDeleteDay = useCallback(
    (targetDayIndex: number) => {
      setTravelPlanDays((previousTravelPlanDays) => {
        previousTravelPlanDays.splice(targetDayIndex, 1);
      });
    },
    [setTravelPlanDays],
  );

  const handleAddPlace = useCallback(
    (dayIndex: number, travelParams: Pick<TravelPlanPlace, "placeName" | "position">) => {
      setTravelPlanDays((previousTravelPlanDays) => {
        const travelPlanDay = previousTravelPlanDays[dayIndex];

        if (travelPlanDay) {
          travelPlanDay.places.push({
            ...travelParams,
            id: uuidv4(),
            todos: [],
          });
        }
      });
    },
    [setTravelPlanDays],
  );

  const handleDeletePlace = useCallback(
    (dayIndex: number, placeIndex: number) => {
      setTravelPlanDays((previousTravelPlanDays) => {
        const travelPlanPlaces = previousTravelPlanDays[dayIndex]?.places;

        if (travelPlanPlaces) {
          travelPlanPlaces.splice(placeIndex, 1);
        }
      });
    },
    [setTravelPlanDays],
  );

  const handleChangeContent = useCallback(
    ({
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
      setTravelPlanDays((previousTravelPlanDays) => {
        const todo = previousTravelPlanDays[dayIndex]?.places[placeIndex]?.todos?.find(
          (todo) => todo.id === todoId,
        );

        if (todo) {
          todo.content = content.slice(
            FORM_VALIDATIONS_MAP.title.minLength,
            FORM_VALIDATIONS_MAP.title.maxLength,
          );
        }
      });
    },
    [setTravelPlanDays],
  );

  const handleAddPlaceTodo = useCallback(
    (dayIndex: number, placeIndex: number) => {
      setTravelPlanDays((previousTravelPlanDays) => {
        const travelPlanPlace = previousTravelPlanDays[dayIndex]?.places[placeIndex];

        if (travelPlanPlace) {
          travelPlanPlace.todos?.push({ id: uuidv4(), content: "", isChecked: false });
        }
      });
    },
    [setTravelPlanDays],
  );

  const handleDeletePlaceTodo = useCallback(
    (dayIndex: number, placeIndex: number, todoId: string) => {
      setTravelPlanDays((previousTravelPlanDays) => {
        const travelPlanPlace = previousTravelPlanDays[dayIndex]?.places[placeIndex];

        if (travelPlanPlace?.todos) {
          travelPlanPlace.todos = travelPlanPlace.todos.filter((todo) => todo.id !== todoId);
        }
      });
    },
    [setTravelPlanDays],
  );

  return {
    travelPlanDays,
    handleChangeTravelPlanDays,
    handleAddDay,
    handleDeleteDay,
    handleAddPlace,
    handleDeletePlace,
    handleChangeContent,
    handleAddPlaceTodo,
    handleDeletePlaceTodo,
  };
};
