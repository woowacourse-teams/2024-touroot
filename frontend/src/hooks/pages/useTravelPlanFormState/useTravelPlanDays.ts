import { useCallback, useState } from "react";

import { produce } from "immer";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";

import type { TravelPlanDay, TravelPlanPlace } from "@type/domain/travelPlan";
import type { TravelTransformDays } from "@type/domain/travelTransform";

import { FORM_ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

import { validateDays, validateTodoContent } from "@utils/validation/travelPlan";

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
  const [travelPlanDaysErrorMessage, setTravelPlanDaysErrorMessage] = useState("");
  const [todoErrorMessages, setTodoErrorMessages] = useState<
    Record<string, Record<string, string>>
  >({});

  const updateTodoContentErrorMessage = ({
    placeId,
    todoId,
    errorMessage,
    isDelete,
  }: {
    placeId: string;
    todoId: string;
    errorMessage?: string;
    isDelete?: boolean;
  }) => {
    setTodoErrorMessages((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (isDelete) {
        if (newErrors[placeId]) {
          delete newErrors[placeId][todoId];
          if (Object.keys(newErrors[placeId]).length === 0) {
            delete newErrors[placeId];
          }
        }
      } else if (errorMessage) {
        if (!newErrors[placeId]) newErrors[placeId] = {};
        newErrors[placeId][todoId] = FORM_ERROR_MESSAGE_MAP.travelPlan.invalidPlanLength;
      } else {
        if (newErrors[placeId]) {
          delete newErrors[placeId][todoId];
          if (Object.keys(newErrors[placeId]).length === 0) {
            delete newErrors[placeId];
          }
        }
      }
      return newErrors;
    });
  };

  const isHavingDays = travelPlanDays.length >= 1;

  const isAllDaysHavingPlaces = travelPlanDays.every((day) => day.places.length >= 1);

  const isValidPlaceTodos = travelPlanDays.every((day) =>
    day.places.every((place) => {
      if (!place.todos || place.todos.length === 0) {
        return true;
      }
      return place.todos.every((todo) => todo.content.trim().length > 0);
    }),
  );

  const isHavingNoTodoErrors = Object.values(todoErrorMessages).every((placeErrors) =>
    Object.values(placeErrors).every((error) => error === ""),
  );

  const isEnabledTravelPlanDays =
    isHavingDays && isAllDaysHavingPlaces && isValidPlaceTodos && isHavingNoTodoErrors;

  const handleChangeTravelPlanDays = useCallback(
    (newTravelPlanDays: TravelPlanDay[]) => {
      setTravelPlanDays(newTravelPlanDays);
      setTravelPlanDaysErrorMessage("");
    },
    [setTravelPlanDays, setTravelPlanDaysErrorMessage],
  );

  const handleAddDay = useCallback(() => {
    setTravelPlanDays((newTravelPlanDays) => {
      newTravelPlanDays.push({ id: uuidv4(), places: [] });

      const errorMessage = validateDays(newTravelPlanDays);

      if (errorMessage) {
        setTravelPlanDaysErrorMessage(errorMessage);
      } else {
        setTravelPlanDaysErrorMessage("");
      }
    });
  }, [setTravelPlanDays]);

  const handleDeleteDay = useCallback(
    (targetDayIndex: number) => {
      setTravelPlanDays((newTravelPlanDays) => {
        newTravelPlanDays.splice(targetDayIndex, 1);

        const errorMessage = validateDays(newTravelPlanDays);

        if (errorMessage) setTravelPlanDaysErrorMessage(errorMessage);
        else setTravelPlanDaysErrorMessage("");
      });
    },
    [setTravelPlanDays],
  );

  const handleAddPlace = useCallback(
    (dayIndex: number, travelParams: Pick<TravelPlanPlace, "placeName" | "position">) => {
      setTravelPlanDays((newTravelPlanDays) => {
        const travelPlanDay = newTravelPlanDays[dayIndex];

        if (travelPlanDay) {
          travelPlanDay.places.push({
            ...travelParams,
            id: uuidv4(),
            todos: [],
          });

          const errorMessage = validateDays(newTravelPlanDays);

          if (errorMessage) setTravelPlanDaysErrorMessage(errorMessage);
          else setTravelPlanDaysErrorMessage("");
        }
      });
    },
    [setTravelPlanDays],
  );

  const handleDeletePlace = useCallback(
    (dayIndex: number, placeIndex: number) => {
      setTravelPlanDays((newTravelPlanDays) => {
        const travelPlanPlaces = newTravelPlanDays[dayIndex]?.places;

        if (travelPlanPlaces) {
          travelPlanPlaces.splice(placeIndex, 1);

          const errorMessage = validateDays(newTravelPlanDays);

          if (errorMessage) setTravelPlanDaysErrorMessage(errorMessage);
          else setTravelPlanDaysErrorMessage("");
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
        const place = previousTravelPlanDays[dayIndex]?.places[placeIndex];
        if (!place) return previousTravelPlanDays;

        const errorMessage = validateTodoContent(content);
        updateTodoContentErrorMessage({
          placeId: place.id,
          todoId,
          errorMessage: errorMessage || undefined,
        });

        const todo = place.todos?.find((todo) => todo.id === todoId);
        if (todo) {
          todo.content = content.slice(
            FORM_VALIDATIONS_MAP.title.minLength,
            FORM_VALIDATIONS_MAP.title.maxLength,
          );
        }
      });
    },
    [setTravelPlanDays, updateTodoContentErrorMessage],
  );

  const handleAddPlaceTodo = useCallback(
    (dayIndex: number, placeIndex: number) => {
      setTravelPlanDays((previousTravelPlanDays) => {
        const place = previousTravelPlanDays[dayIndex]?.places[placeIndex];
        if (place) {
          const todoId = uuidv4();
          place.todos?.push({ id: todoId, content: "", isChecked: false });
          updateTodoContentErrorMessage({ placeId: place.id, todoId, errorMessage: "" });
        }
      });
    },
    [setTravelPlanDays, updateTodoContentErrorMessage],
  );

  const handleDeletePlaceTodo = useCallback(
    (dayIndex: number, placeIndex: number, todoId: string) => {
      setTravelPlanDays((previousTravelPlanDays) => {
        const place = previousTravelPlanDays[dayIndex]?.places[placeIndex];
        if (place?.todos) {
          place.todos = place.todos.filter((todo) => todo.id !== todoId);
          updateTodoContentErrorMessage({ placeId: place.id, todoId, isDelete: true });
        }
      });
    },
    [setTravelPlanDays, updateTodoContentErrorMessage],
  );

  return {
    travelPlanDays,
    travelPlanDaysErrorMessage,
    todoErrorMessages,
    isEnabledTravelPlanDays,
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
