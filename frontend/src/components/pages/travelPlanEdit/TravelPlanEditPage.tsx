import { useBeforeUnload, useNavigate } from "react-router-dom";

import {
  Accordion,
  Button,
  CharacterCount,
  EditRegisterModalBottomSheet,
  GoogleMapLoadScript,
  IconButton,
  Input,
  PageInfo,
  Text,
  TextField,
} from "@components/common";
import Calendar from "@components/common/Calendar/Calendar";
import useTravelPlanEdit from "@components/pages/travelPlanEdit/hooks/useTravelPlanEdit";
import { useTravelPlanInitialization } from "@components/pages/travelPlanEdit/hooks/useTravelPlanInitialization";
import TravelPlanDayAccordion from "@components/pages/travelPlanRegister/TravelPlanDayAccordion/TravelPlanDayAccordion";

import useTravelPlanFormState from "@hooks/pages/useTravelPlanFormState/useTravelPlanFormState";
import useToggle from "@hooks/useToggle";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { ROUTE_PATHS_MAP } from "@constants/route";

import { extractUTCDate } from "@utils/extractUTCDate";

import * as S from "./TravelPlanEditPage.styled";

const TravelPlanEditPage = () => {
  const [isOpen, handleOpenBottomSheet, handleCloseBottomSheet] = useToggle();
  const [isShowCalendar, handleOpenCalendar, handleCloseCalendar] = useToggle();

  const {
    state: { title, startDate, travelPlanDays },
    handler: {
      handleChangeTravelPlanDays,
      handleChangeTitle,
      handleSelectStartDate,
      handleInitializeStartDate,
      handleAddDay,
      handleAddPlace,
      handleDeleteDay,
      handleDeletePlace,
      handleAddPlaceTodo,
      handleDeletePlaceTodo,
      handleChangeContent,
    },
    errorMessages: {
      titleErrorMessage,
      startDateErrorMessage,
      todoErrorMessages,
      travelPlanDaysErrorMessage,
    },
    isEnabledForm,
  } = useTravelPlanFormState([]);

  const { status, error, isLoading } = useTravelPlanInitialization({
    handleChangeTitle,
    handleChangeTravelPlanDays,
    handleInitializeStartDate,
  });

  const { handleDebouncedEditTravelPlan, isPuttingTravelPlanPending } = useTravelPlanEdit(
    { title, startDate: extractUTCDate(startDate), days: travelPlanDays },
    handleCloseBottomSheet,
  );

  const navigate = useNavigate();

  useBeforeUnload((event) => {
    event.preventDefault();
  });

  if (status === "error") {
    const errorMessage =
      error?.message === ERROR_MESSAGE_MAP.api.travelPlanOnlyWriter
        ? ERROR_MESSAGE_MAP.api.travelPlanEditOnlyWriter
        : error?.message;

    alert(errorMessage);
    navigate(ROUTE_PATHS_MAP.back);
  }

  if (isLoading) <>Loading...</>;

  return (
    <>
      <S.Layout>
        <PageInfo mainText="여행 계획 수정" />
        <TextField title="제목" isRequired>
          {(id) => (
            <S.InputContainer>
              <Input
                id={id}
                value={title}
                maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
                placeholder="여행 계획 제목을 입력해주세요"
                onChange={(event) => handleChangeTitle(event.target.value)}
              />
              <S.TitleMessageContainer>
                {titleErrorMessage && (
                  <Text textType="detail" css={S.errorTextStyle}>
                    {titleErrorMessage}
                  </Text>
                )}
                <CharacterCount
                  count={title.length}
                  maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
                  css={S.characterCountStyle}
                />
              </S.TitleMessageContainer>
            </S.InputContainer>
          )}
        </TextField>

        <TextField
          title="시작일"
          subTitle="시작일을 선택하면 마감일은 투룻이 계산 해드릴게요!"
          isRequired
        >
          {(id) => (
            <>
              <Input
                id={id}
                value={startDate ? startDate.toLocaleDateString().slice(0, -1) : ""}
                onClick={handleOpenCalendar}
                readOnly
                placeholder="시작일을 입력해주세요"
              />
              {isShowCalendar && (
                <Calendar
                  onSelectDate={(date) => handleSelectStartDate(date, handleCloseCalendar)}
                  onClose={handleCloseCalendar}
                />
              )}
              {startDateErrorMessage && (
                <Text textType="detail" css={S.errorTextStyle}>
                  {startDateErrorMessage}
                </Text>
              )}
            </>
          )}
        </TextField>

        <div>
          <GoogleMapLoadScript
            loadingElement={
              <IconButton
                size="16"
                iconType="plus"
                position="left"
                css={S.addButtonStyle}
                onClick={handleAddDay}
              >
                <Text textType="bodyBold">일자 추가하기</Text>
              </IconButton>
            }
          >
            <Accordion.Root>
              {travelPlanDays.map((travelDay, dayIndex) => (
                <TravelPlanDayAccordion
                  key={travelDay.id}
                  startDate={startDate}
                  todoErrorMessages={todoErrorMessages}
                  onDeletePlaceTodo={handleDeletePlaceTodo}
                  onChangeContent={handleChangeContent}
                  travelPlanDay={travelDay}
                  dayIndex={dayIndex}
                  onAddPlace={handleAddPlace}
                  onDeletePlace={handleDeletePlace}
                  onDeleteDay={handleDeleteDay}
                  onAddPlaceTodo={handleAddPlaceTodo}
                />
              ))}
              <IconButton
                size="16"
                iconType="plus"
                position="left"
                css={S.addButtonStyle}
                onClick={handleAddDay}
              >
                <Text textType="bodyBold">일자 추가하기</Text>
              </IconButton>
              {travelPlanDaysErrorMessage && (
                <Text textType="detail" css={S.errorTextStyle}>
                  {travelPlanDaysErrorMessage}
                </Text>
              )}
            </Accordion.Root>
          </GoogleMapLoadScript>
        </div>
        <Button variants="primary" disabled={!isEnabledForm} onClick={handleOpenBottomSheet}>
          수정
        </Button>
      </S.Layout>

      <EditRegisterModalBottomSheet
        isOpen={isOpen}
        isPending={isPuttingTravelPlanPending}
        mainText="여행 계획을 수정할까요?"
        subText="수정한 후에도 다시 여행 계획을 변경할 수 있어요."
        onClose={handleCloseBottomSheet}
        onConfirm={handleDebouncedEditTravelPlan}
      />
    </>
  );
};

export default TravelPlanEditPage;
