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

  const onChangeTravelPlanDays = useCallback(
    (newDays: TravelPlanDay[]) => {
      setTravelPlanDays(newDays);
    },
    [setTravelPlanDays],
  );

  const onAddDay = useCallback(() => {
    setTravelPlanDays((previousTravelPlanDays) => {
      previousTravelPlanDays.push({ id: uuidv4(), places: [] });
    });
  }, [setTravelPlanDays]);

  const onDeleteDay = useCallback(
    (targetDayIndex: number) => {
      setTravelPlanDays((previousTravelPlanDays) => {
        previousTravelPlanDays.splice(targetDayIndex, 1);
      });
    },
    [setTravelPlanDays],
  );

  const onAddPlace = useCallback(
    (
      dayIndex: number,
      travelParams: Pick<TravelPlanPlace, "placeName" | "position" | "countryCode">,
    ) => {
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

  const onDeletePlace = useCallback(
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

  const onChangeContent = useCallback(
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

  const onAddPlaceTodo = useCallback(
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

  const onDeletePlaceTodo = useCallback(
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
