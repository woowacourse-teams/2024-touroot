import { useState } from "react";

import { TravelPlanDay, TravelPlanPlace } from "@type/domain/travelPlan";

import { Accordion, GoogleMapView, GoogleSearchPopup, IconButton } from "@components/common";
import PlaceTodoListItem from "@components/pages/travelPlanRegister/PlaceTodoListItem/PlaceTodoListItem";

import * as S from "../TravelPlanRegisterPage.styled";

interface TravelPlanDayAccordionProps {
  travelPlanDay: TravelPlanDay;
  dayIndex: number;
  startDate: Date | null;
  onDeleteDay: (dayIndex: number) => void;
  onDeletePlace: (dayIndex: number, placeIndex: number) => void;
  onDeletePlaceTodo: (dayIndex: number, placeIndex: number, todoId: string) => void;
  onAddPlace: (
    dayIndex: number,
    travelParams: Pick<TravelPlanPlace, "placeName" | "position">,
  ) => void;
  onAddPlaceTodo: (dayIndex: number, placeIndex: number) => void;
  onChangeContent: ({
    content,
    dayIndex,
    placeIndex,
    todoId,
  }: {
    content: string;
    dayIndex: number;
    placeIndex: number;
    todoId: string;
  }) => void;
}

const TravelPlanDayAccordion = ({
  travelPlanDay,
  dayIndex,
  startDate,
  onDeleteDay,
  onDeletePlace,
  onAddPlaceTodo,
  onAddPlace,
  onDeletePlaceTodo,
  onChangeContent,
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
                <S.PlaceTodoListItemContainer>
                  {place.todos?.map((todo) => (
                    <PlaceTodoListItem
                      key={todo.id}
                      onChangeContent={(e) =>
                        onChangeContent({
                          content: e.target.value,
                          dayIndex,
                          placeIndex,
                          todoId: todo.id as string,
                        })
                      }
                      onDeleteTodo={() =>
                        onDeletePlaceTodo(dayIndex, placeIndex, todo.id as string)
                      }
                    />
                  ))}
                </S.PlaceTodoListItemContainer>
                <IconButton
                  size="16"
                  iconType="plus"
                  position="left"
                  css={[S.addTravelAddButtonStyle, S.addDayButtonStyle]}
                  onClick={() => onAddPlaceTodo(dayIndex, placeIndex)}
                >
                  할 일 추가하기
                </IconButton>
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
