import { useState } from "react";

import { TravelPlanDay, TravelPlanPlace } from "@type/domain/travelPlan";

import {
  Accordion,
  GoogleMapView,
  GoogleSearchPopup,
  IconButton,
  Textarea,
} from "@components/common";

import * as S from "../TravelPlanRegisterPage.styled";

interface TravelPlanDayAccordionProps {
  travelPlanDay: TravelPlanDay;
  dayIndex: number;
  startDate: Date | null;
  onDeleteDay: (dayIndex: number) => void;
  onDeletePlace: (dayIndex: number, placeIndex: number) => void;
  onChangePlaceDescription: (description: string, dayIndex: number, placeIndex: number) => void;
  onAddPlace: (
    dayIndex: number,
    travelParams: Pick<TravelPlanPlace, "placeName" | "position">,
  ) => void;
}

const TravelPlanDayAccordion = ({
  travelPlanDay,
  dayIndex,
  startDate,
  onDeleteDay,
  onDeletePlace,
  onChangePlaceDescription,
  onAddPlace,
}: TravelPlanDayAccordionProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onSelectSearchResult = (
    placeInfo: Pick<TravelPlanPlace, "placeName" | "position">,
    dayIndex: number,
  ) => {
    onAddPlace(dayIndex, placeInfo);
    setIsPopupOpen(false);
  };

  const onClickAddPlaceButton = () => {
    setIsPopupOpen(true);
  };

  const dateString = !startDate
    ? ""
    : `${startDate.getFullYear()}. ${startDate.getMonth() + 1}. ${startDate.getDate() + dayIndex}`;

  return (
    <Accordion.Item value={travelPlanDay.id}>
      <Accordion.Trigger onDeleteItem={() => onDeleteDay(dayIndex)}>
        {`Day ${dayIndex + 1}`} <S.DayDetailText>{dateString}</S.DayDetailText>
      </Accordion.Trigger>
      <Accordion.Content>
        <Accordion.Root>
          <GoogleMapView
            places={travelPlanDay.places.map((place) => ({
              lat: Number(place.position.lat),
              lng: Number(place.position.lng),
            }))}
          />
          {travelPlanDay.places.map((place, placeIndex) => (
            <Accordion.Item key={place.id} value={place.id}>
              <Accordion.Trigger onDeleteItem={() => onDeletePlace(dayIndex, placeIndex)}>
                {place.placeName || `장소 ${placeIndex + 1}`}
              </Accordion.Trigger>
              <Accordion.Content>
                <Textarea
                  value={place.description}
                  placeholder="장소에 대한 간단한 설명을 남겨주세요"
                  onChange={(e) => onChangePlaceDescription(e.target.value, dayIndex, placeIndex)}
                  count={place.description?.length ?? 0}
                  maxLength={300}
                  maxCount={300}
                />
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
        <IconButton
          size="16"
          iconType="plus"
          position="left"
          css={[S.addTravelAddButtonStyle, S.addDayButtonStyle]}
          onClick={onClickAddPlaceButton}
        >
          장소 추가하기
        </IconButton>
      </Accordion.Content>
      {isPopupOpen && (
        <GoogleSearchPopup
          onClosePopup={() => setIsPopupOpen(false)}
          onSearchPlaceInfo={(placeInfo) => onSelectSearchResult(placeInfo, dayIndex)}
        />
      )}
    </Accordion.Item>
  );
};

export default TravelPlanDayAccordion;
