import { useCallback, useState } from "react";

import { produce } from "immer";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";

import { PlaceInfo } from "@type/domain/common";
import type { TravelTransformDays } from "@type/domain/travelTransform";
import type { TravelogueDay } from "@type/domain/travelogue";

import { validateDays } from "@utils/validation/travelogue";

const MIN_DESCRIPTION_LENGTH = 0;
const MAX_DESCRIPTION_LENGTH = 300;

const transformTravelogueDays = (travelTransformDays: TravelTransformDays[]) =>
  produce(travelTransformDays, (newTravelTransformDays) => {
    newTravelTransformDays.forEach(
      (day) =>
        (day.places = day.places.map((place) => ({ ...place, description: "", photoUrls: [] }))),
    );
  });

const useTravelogueDays = (days: TravelTransformDays[]) => {
  const [travelogueDays, setTravelogueDays] = useImmer<TravelogueDay[]>(() =>
    transformTravelogueDays(days),
  );
  const [travelogueDaysErrorMessage, setTravelogueDaysErrorMessage] = useState("");

  const handleChangeTravelogueDays = useCallback(
    (newTravelogueDays: TravelogueDay[]) => {
      setTravelogueDays(newTravelogueDays);
      setTravelogueDaysErrorMessage("");
    },
    [setTravelogueDays, setTravelogueDaysErrorMessage],
  );

  const handleAddDay = useCallback(() => {
    setTravelogueDays((newTravelogueDays) => {
      newTravelogueDays.push({ id: uuidv4(), places: [] });

      const errorMessage = validateDays(newTravelogueDays);

      if (errorMessage) {
        setTravelogueDaysErrorMessage(errorMessage);
      } else {
        setTravelogueDaysErrorMessage("");
      }
    });
  }, [setTravelogueDays, setTravelogueDaysErrorMessage]);

  const handleDeleteDay = useCallback(
    (targetDayIndex: number) => {
      setTravelogueDays((newTravelogueDays) => {
        newTravelogueDays.splice(targetDayIndex, 1);
        const errorMessage = validateDays(newTravelogueDays);

        if (errorMessage) setTravelogueDaysErrorMessage(errorMessage);
        else setTravelogueDaysErrorMessage("");
      });
    },
    [setTravelogueDays],
  );

  const handleAddPlace = useCallback(
    (dayIndex: number, traveloguePlace: PlaceInfo) => {
      setTravelogueDays((newTravelogueDays) => {
        newTravelogueDays[dayIndex].places.push({
          ...traveloguePlace,
          id: uuidv4(),
          photoUrls: [],
          description: "",
        });

        const errorMessage = validateDays(newTravelogueDays);

        if (errorMessage) setTravelogueDaysErrorMessage(errorMessage);
        else setTravelogueDaysErrorMessage("");
      });
    },
    [setTravelogueDays],
  );

  const handleDeletePlace = useCallback(
    (dayIndex: number, placeIndex: number) => {
      setTravelogueDays((newTravelogueDays) => {
        newTravelogueDays[dayIndex].places.splice(placeIndex, 1);

        const errorMessage = validateDays(newTravelogueDays);

        if (errorMessage) setTravelogueDaysErrorMessage(errorMessage);
        else setTravelogueDaysErrorMessage("");
      });
    },
    [setTravelogueDays],
  );

  const handleChangePlaceDescription = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>, dayIndex: number, placeIndex: number) => {
      setTravelogueDays((newTravelogueDays) => {
        newTravelogueDays[dayIndex].places[placeIndex].description = event.target.value.slice(
          MIN_DESCRIPTION_LENGTH,
          MAX_DESCRIPTION_LENGTH,
        );
      });
    },
    [setTravelogueDays],
  );

  const handleChangeImageUrls = useCallback(
    (dayIndex: number, placeIndex: number, imgUrls: string[]) => {
      setTravelogueDays((newTravelogueDays) => {
        const place = newTravelogueDays[dayIndex].places[placeIndex];
        place.photoUrls = [...(place.photoUrls || []), ...imgUrls];
      });
    },
    [setTravelogueDays],
  );

  const handleDeleteImageUrls = useCallback(
    (dayIndex: number, targetPlaceIndex: number, imageIndex: number) => {
      setTravelogueDays((newTravelogueDays) => {
        const place = newTravelogueDays[dayIndex].places[targetPlaceIndex];

        place.photoUrls?.splice(imageIndex, 1);
      });
    },
    [setTravelogueDays],
  );

  const isEnabledTravelogueDays =
    travelogueDaysErrorMessage === "" &&
    travelogueDays.length >= 1 &&
    travelogueDays.every((day) => day.places.length > 0);

  return {
    travelogueDays,
    travelogueDaysErrorMessage,
    isEnabledTravelogueDays,
    handleChangeTravelogueDays,
    handleAddDay,
    handleDeleteDay,
    handleAddPlace,
    handleDeletePlace,
    handleChangePlaceDescription,
    handleChangeImageUrls,
    handleDeleteImageUrls,
  };
};

export default useTravelogueDays;
