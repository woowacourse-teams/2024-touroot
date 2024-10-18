import { TravelPlanDay, TravelPlanPlace } from "@type/domain/travelPlan";

import { Accordion, GoogleMapView, GoogleSearchPopup, IconButton, Text } from "@components/common";
import PlaceTodoListItem from "@components/pages/travelPlanRegister/PlaceTodoListItem/PlaceTodoListItem";

import useSearchPlaceHistory from "@hooks/useSearchPlaceHistory";

import { CYPRESS_DATA_MAP } from "@constants/cypress";

import * as S from "../TravelPlanRegisterPage.styled";

interface TravelPlanDayAccordionProps {
  travelPlanDay: TravelPlanDay;
  dayIndex: number;
  startDate: Date | null;
  todoErrorMessages?: Record<string, Record<string, string>>;
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
  todoErrorMessages,
  onDeleteDay,
  onDeletePlace,
  onAddPlaceTodo,
  onAddPlace,
  onDeletePlaceTodo,
  onChangeContent,
}: TravelPlanDayAccordionProps) => {
  const { isPopupOpen, handleOpenPopup, handleClosePopup } = useSearchPlaceHistory();

  const handleSelectSearchResult = (
    placeInfo: Pick<TravelPlanPlace, "placeName" | "position">,
    dayIndex: number,
  ) => {
    onAddPlace(dayIndex, placeInfo);
    handleClosePopup();
  };

  const getDateString = (startDate: Date | null, dayIndex: number): string => {
    if (!startDate) return "";

    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + dayIndex);

    return `${currentDate.getFullYear()}. ${currentDate.getMonth() + 1}. ${currentDate.getDate()}`;
  };

  const dateString = getDateString(startDate, dayIndex);

  console.log(todoErrorMessages);

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
                      todo={todo}
                      todoErrorMessage={todoErrorMessages?.[place.id]?.[todo.id] ?? ""}
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
                {todoErrorMessages?.[place.id] &&
                  Object.values(todoErrorMessages).some((message) => message) &&
                  place.todos && (
                    <Text textType="detail" css={S.errorTextStyle}>
                      {Object.values(todoErrorMessages?.[place.id]).find((message) => message)}
                    </Text>
                  )}
                <IconButton
                  size="16"
                  iconType="plus"
                  position="left"
                  css={[S.addTravelAddButtonStyle, S.addDayButtonStyle]}
                  onClick={() => onAddPlaceTodo(dayIndex, placeIndex)}
                  data-cy={CYPRESS_DATA_MAP.travelPlanRegister.addTodoButton}
                >
                  <Text textType="bodyBold">할 일 추가하기</Text>
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
          onClick={handleOpenPopup}
          data-cy={CYPRESS_DATA_MAP.travelPlanRegister.addPlaceButton}
        >
          <Text textType="bodyBold">장소 추가하기</Text>
        </IconButton>
      </Accordion.Content>
      {isPopupOpen && (
        <GoogleSearchPopup
          onClosePopup={handleClosePopup}
          onSearchPlaceInfo={(placeInfo) => handleSelectSearchResult(placeInfo, dayIndex)}
        />
      )}
    </Accordion.Item>
  );
};

export default TravelPlanDayAccordion;
