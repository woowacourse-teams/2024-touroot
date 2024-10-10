import { useCallback } from "react";

import { produce } from "immer";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";

import type { TravelTransformDays } from "@type/domain/travelTransform";
import type { TravelogueDay, TraveloguePlace } from "@type/domain/travelogue";

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

  const onChangeTravelogueDays = useCallback(
    (newTravelogueDays: TravelogueDay[]) => {
      setTravelogueDays(newTravelogueDays);
    },
    [setTravelogueDays],
  );

  const onAddDay = useCallback(() => {
    setTravelogueDays((newTravelogueDays) => {
      newTravelogueDays.push({ id: uuidv4(), places: [] });
    });
  }, [setTravelogueDays]);

  const onDeleteDay = useCallback(
    (targetDayIndex: number) => {
      setTravelogueDays((newTravelogueDays) => {
        newTravelogueDays.splice(targetDayIndex, 1);
      });
    },
    [setTravelogueDays],
  );

  const onAddPlace = useCallback(
    (dayIndex: number, traveloguePlace: Pick<TraveloguePlace, "placeName" | "position">) => {
      setTravelogueDays((newTravelogueDays) => {
        newTravelogueDays[dayIndex].places.push({
          ...traveloguePlace,
          id: uuidv4(),
          photoUrls: [],
          description: "",
        });
      });
    },
    [setTravelogueDays],
  );

  const onDeletePlace = useCallback(
    (dayIndex: number, placeIndex: number) => {
      setTravelogueDays((newTravelogueDays) => {
        newTravelogueDays[dayIndex].places.splice(placeIndex, 1);
      });
    },
    [setTravelogueDays],
  );

  const onChangePlaceDescription = useCallback(
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

  const onChangeImageUrls = useCallback(
    (dayIndex: number, placeIndex: number, imgUrls: string[]) => {
      setTravelogueDays((newTravelogueDays) => {
        const place = newTravelogueDays[dayIndex].places[placeIndex];
        place.photoUrls = [...(place.photoUrls || []), ...imgUrls];
      });
    },
    [setTravelogueDays],
  );

  const onDeleteImageUrls = useCallback(
    (dayIndex: number, targetPlaceIndex: number, imageIndex: number) => {
      setTravelogueDays((newTravelogueDays) => {
        const place = newTravelogueDays[dayIndex].places[targetPlaceIndex];

        place.photoUrls?.splice(imageIndex, 1);
      });
    },
    [setTravelogueDays],
  );

  return {
    travelogueDays,
    onChangeTravelogueDays,
    onAddDay,
    onDeleteDay,
    onAddPlace,
    onDeletePlace,
    onChangePlaceDescription,
    onChangeImageUrls,
    onDeleteImageUrls,
  };
};

export default useTravelogueDays;
