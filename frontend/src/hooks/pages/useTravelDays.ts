import { useCallback, useState } from "react";

import type {
  TransformPlaces,
  TravelRegisterDay,
  TravelRegisterPlace,
} from "@type/domain/travelogue";

export const useTravelDays = (days: TransformPlaces[]) => {
  const [travelDays, setTravelDays] = useState<TravelRegisterDay[]>(days);

  const onAddDay = useCallback((dayIndex?: number) => {
    setTravelDays((prevTravelDays) =>
      dayIndex
        ? Array.from({ length: dayIndex }, () => ({ places: [] }))
        : [...prevTravelDays, { places: [] }],
    );
  }, []);

  const onDeleteDay = (targetDayIndex: number) => {
    setTravelDays((prevTravelDays) =>
      prevTravelDays.filter((_, dayIndex) => dayIndex !== targetDayIndex),
    );
  };

  const onAddPlace = (dayIndex: number, travelParams: TravelRegisterPlace) => {
    setTravelDays((prevTravelDays) => {
      const newTravelDays = [...prevTravelDays];
      newTravelDays[dayIndex].places.push(travelParams);
      return newTravelDays;
    });
  };

  const onDeletePlace = (dayIndex: number, placeIndex: number) => {
    setTravelDays((prevTravelDays) => {
      const newTravelDays = [...prevTravelDays];
      newTravelDays[dayIndex] = {
        ...newTravelDays[dayIndex],
        places: newTravelDays[dayIndex].places.filter((_, index) => index !== placeIndex),
      };

      return newTravelDays;
    });
  };

  const onChangePlaceDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    dayIndex: number,
    placeIndex: number,
  ) => {
    const newTravelDays = [...travelDays];
    newTravelDays[dayIndex].places[placeIndex].description = e.target.value;
    setTravelDays(newTravelDays);
  };

  const onChangeImageUrls = (dayIndex: number, placeIndex: number, imgUrls: string[]) =>
    setTravelDays((prevTravelDays) =>
      prevTravelDays.map((day, dIndex) => {
        if (dIndex !== dayIndex) return day;

        return {
          ...day,
          places: day.places.map((place, pIndex) => {
            if (pIndex !== placeIndex) return place;

            return {
              ...place,
              photoUrls: [
                ...(place.photoUrls || []),
                ...imgUrls.map((imgUrl) => ({ url: imgUrl })),
              ],
            };
          }),
        };
      }),
    );

  const onDeleteImageUrls = (dayIndex: number, targetPlaceIndex: number, imageIndex: number) =>
    setTravelDays((prevTravelDays) => {
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
    travelDays,
    onAddDay,
    onDeleteDay,
    onAddPlace,
    onDeletePlace,
    onChangePlaceDescription,
    onChangeImageUrls,
    onDeleteImageUrls,
  };
};
