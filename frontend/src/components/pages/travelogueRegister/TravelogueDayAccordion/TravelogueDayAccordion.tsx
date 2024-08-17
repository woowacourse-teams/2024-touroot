import { useState } from "react";

import { MutateOptions } from "@tanstack/react-query";

import type { TravelogueDay, TraveloguePlace } from "@type/domain/travelogue";

import {
  Accordion,
  GoogleMapView,
  GoogleSearchPopup,
  IconButton,
  Textarea,
} from "@components/common";
import TravelogueMultiImageUpload from "@components/pages/travelogueRegister/TravelogueMultiImageUpload/TravelogueMultiImageUpload";

import * as S from "../TravelogueRegisterPage.styled";

interface TravelogueDayAccordionProps {
  travelogueDay: TravelogueDay;
  dayIndex: number;
  onDeleteDay: (dayIndex: number) => void;
  onDeletePlace: (dayIndex: number, placeIndex: number) => void;
  onChangePlaceDescription: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    dayIndex: number,
    placeIndex: number,
  ) => void;
  onAddPlace: (
    dayIndex: number,
    traveloguePlace: Pick<TraveloguePlace, "placeName" | "position">,
  ) => void;
  onChangeImageUrls: (dayIndex: number, placeIndex: number, imgUrls: string[]) => void;
  onDeleteImageUrls: (dayIndex: number, targetPlaceIndex: number, imageIndex: number) => void;
  onRequestAddImage: (
    variables: File[],
    options?: MutateOptions<string[], Error, File[], unknown> | undefined,
  ) => Promise<string[]>;
}

const TravelogueDayAccordion = ({
  travelogueDay,
  dayIndex,
  onAddPlace,
  onDeleteDay,
  onDeletePlace,
  onChangePlaceDescription,
  onChangeImageUrls,
  onDeleteImageUrls,
  onRequestAddImage,
}: TravelogueDayAccordionProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onSelectSearchResult = (
    placeInfo: Pick<TraveloguePlace, "placeName" | "position">,
    dayIndex: number,
  ) => {
    onAddPlace(dayIndex, placeInfo);
    setIsPopupOpen(false);
  };

  const onClickAddPlaceButton = () => {
    setIsPopupOpen(true);
  };

  return (
    <Accordion.Item key={travelogueDay.id} value={travelogueDay.id}>
      <Accordion.Trigger onDeleteItem={() => onDeleteDay(dayIndex)}>
        {`Day ${dayIndex + 1}`}
      </Accordion.Trigger>
      <Accordion.Content>
        <Accordion.Root>
          <GoogleMapView
            places={travelogueDay.places.map((place) => ({
              lat: Number(place.position.lat),
              lng: Number(place.position.lng),
            }))}
          />
          {travelogueDay.places.map((place, placeIndex) => (
            <Accordion.Item key={place.id} value={place.id}>
              <Accordion.Trigger onDeleteItem={() => onDeletePlace(dayIndex, placeIndex)}>
                {place.placeName || `장소 ${placeIndex + 1}`}
              </Accordion.Trigger>
              <Accordion.Content>
                <TravelogueMultiImageUpload
                  imageUrls={place.photoUrls ?? []}
                  dayIndex={dayIndex}
                  placeIndex={placeIndex}
                  onChangeImageUrls={onChangeImageUrls}
                  onDeleteImageUrls={onDeleteImageUrls}
                  onRequestAddImage={onRequestAddImage}
                />
                <Textarea
                  value={place.description}
                  placeholder="장소에 대한 간단한 설명을 남겨주세요"
                  onChange={(e) => onChangePlaceDescription(e, dayIndex, placeIndex)}
                  count={travelogueDay.places[placeIndex].description?.length ?? 0}
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

export default TravelogueDayAccordion;
