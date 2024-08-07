import { useCallback, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import type { TravelTransformPlaces } from "@type/domain/travelTransform";
import type { TravelogueDay, TraveloguePlace } from "@type/domain/travelogue";

const MIN_DESCRIPTION_LENGTH = 0;
const MAX_DESCRIPTION_LENGTH = 300;

export const useTravelogueDays = (days: TravelTransformPlaces[]) => {
  const [travelogueDays, setTravelogueDays] = useState<TravelogueDay[]>(days);

  const onAddDay = useCallback((dayIndex?: number) => {
    setTravelogueDays((prevTravelDays) =>
      dayIndex
        ? Array.from({ length: dayIndex }, () => ({ id: uuidv4(), places: [] }))
        : [...prevTravelDays, { id: uuidv4(), places: [] }],
    );
  }, []);

  const onDeleteDay = (targetDayIndex: number) => {
    setTravelogueDays((prevTravelDays) =>
      prevTravelDays.filter((_, dayIndex) => dayIndex !== targetDayIndex),
    );
  };

  const onAddPlace = (
    dayIndex: number,
    traveloguePlace: Pick<TraveloguePlace, "placeName" | "position">,
  ) => {
    setTravelogueDays((prevTravelDays) => {
      const newTraveloguePlaces = [...prevTravelDays];
      newTraveloguePlaces[dayIndex].places.push({ ...traveloguePlace, id: uuidv4() });
      return newTraveloguePlaces;
    });
  };

  const onDeletePlace = (dayIndex: number, placeIndex: number) => {
    setTravelogueDays((prevTravelDays) => {
      const newTraveloguePlaces = [...prevTravelDays];
      newTraveloguePlaces[dayIndex] = {
        ...newTraveloguePlaces[dayIndex],
        places: newTraveloguePlaces[dayIndex].places.filter((_, index) => index !== placeIndex),
      };

      return newTraveloguePlaces;
    });
  };

  const onChangePlaceDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    dayIndex: number,
    placeIndex: number,
  ) => {
    const newTraveloguePlaces = [...travelogueDays];
    newTraveloguePlaces[dayIndex].places[placeIndex].description = e.target.value.slice(
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    );
    setTravelogueDays(newTraveloguePlaces);
  };

  const onChangeImageUrls = (dayIndex: number, placeIndex: number, imgUrls: string[]) =>
    setTravelogueDays((prevTravelDays) =>
      prevTravelDays.map((day, dIndex) => {
        if (dIndex !== dayIndex) return day;

        return {
          ...day,
          places: day.places.map((place, pIndex) => {
            if (pIndex !== placeIndex) return place;

            return {
              ...place,
              photoUrls: [...(place.photoUrls || []), ...imgUrls],
            };
          }),
        };
      }),
    );

  const onDeleteImageUrls = (dayIndex: number, targetPlaceIndex: number, imageIndex: number) =>
    setTravelogueDays((prevTravelDays) => {
      return prevTravelDays.map((day, dIndex) => {
        if (dIndex !== dayIndex) return day;

        return {
          ...day,
          places: day.places.map((place, placeIndex) => {
            return placeIndex !== targetPlaceIndex
              ? place
              : {
                  ...place,
                  photoUrls: place.photoUrls
                    ? place.photoUrls.filter((_, index) => index !== imageIndex)
                    : [],
                };
          }),
        };
      });
    });

  return {
    travelogueDays,
    onAddDay,
    onDeleteDay,
    onAddPlace,
    onDeletePlace,
    onChangePlaceDescription,
    onChangeImageUrls,
    onDeleteImageUrls,
  };
};
