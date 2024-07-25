import { useState } from "react";

import { TravelRegisterDay, TravelRegisterPlace } from "@type/domain/travelogue";

import {
  Accordion,
  GoogleMapView,
  GoogleSearchPopup,
  IconButton,
  Textarea,
} from "@components/common";

import * as S from "../../pages/travelogueRegister/TravelogueRegisterPage.styled";

const DayContent = ({
  children,
  travelDay,
  dayIndex,
  onDeleteDay,
  onDeletePlace,
  onChangePlaceDescription,
  onAddPlace,
}: {
  children: (placeIndex: number) => JSX.Element;
  travelDay: TravelRegisterDay;
  dayIndex: number;
  onDeleteDay: (dayIndex: number) => void;
  onDeletePlace: (dayIndex: number, placeIndex: number) => void;
  onChangePlaceDescription: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    dayIndex: number,
    placeIndex: number,
  ) => void;
  onAddPlace: (dayIndex: number, travelParams: TravelRegisterPlace) => void;
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onSelectSearchResult = (
    placeInfo: Pick<TravelRegisterPlace, "name" | "position">,
    dayIndex: number,
  ) => {
    onAddPlace(dayIndex, placeInfo);
    setIsPopupOpen(false);
  };

  const onClickAddPlaceButton = () => {
    setIsPopupOpen(true);
  };

  return (
    <Accordion.Item key={`${travelDay}-${dayIndex}}`} value={`day-${dayIndex}`}>
      <Accordion.Trigger onDeleteItem={() => onDeleteDay(dayIndex)}>
        {`Day ${dayIndex + 1}`}
      </Accordion.Trigger>
      <Accordion.Content>
        <Accordion.Root>
          <GoogleMapView places={travelDay.places.map((place) => place.position)} />
          {travelDay.places.map((place, placeIndex) => (
            <Accordion.Item key={`${place}-${dayIndex}}`} value={`place-${dayIndex}-${placeIndex}`}>
              <Accordion.Trigger onDeleteItem={() => onDeletePlace(dayIndex, placeIndex)}>
                {place.name || `장소 ${placeIndex + 1}`}
              </Accordion.Trigger>
              <Accordion.Content>
                {children(placeIndex)}
                <Textarea
                  placeholder="장소에 대한 간단한 설명을 남겨주세요"
                  onChange={(e) => onChangePlaceDescription(e, dayIndex, placeIndex)}
                  count={travelDay.places[placeIndex].description?.length ?? 0}
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
          onSearchPlaceInfo={(placeInfo) => onSelectSearchResult(placeInfo, dayIndex)}
        />
      )}
    </Accordion.Item>
  );
};

export default DayContent;
