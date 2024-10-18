import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import {
  Accordion,
  Button,
  Calendar,
  CharacterCount,
  EditRegisterModalBottomSheet,
  GoogleMapLoadScript,
  IconButton,
  Input,
  PageInfo,
  Text,
  TextField,
} from "@components/common";
import TravelPlanDayAccordion from "@components/pages/travelPlanRegister/TravelPlanDayAccordion/TravelPlanDayAccordion";
import useTravelPlanRegister from "@components/pages/travelPlanRegister/hooks/useTravelPlanRegister";

import useTravelPlanFormState from "@hooks/pages/useTravelPlanFormState/useTravelPlanFormState";
import useAuthRedirect from "@hooks/useAuthRedirect";
import useToggle from "@hooks/useToggle";

import { CYPRESS_DATA_MAP } from "@constants/cypress";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

import { extractUTCDate } from "@utils/extractUTCDate";

import * as S from "./TravelPlanRegisterPage.styled";

const TravelPlanRegisterPage = () => {
  const { transformDetail } = useTravelTransformDetailContext();

  const {
    state: { title, startDate, travelPlanDays },
    handler: {
      handleChangeTitle,
      handleSelectStartDate,
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
  } = useTravelPlanFormState(transformDetail?.days ?? []);

  const [isOpenBottomSheet, handleBottomSheetOpen, handleBottomSheetClose] = useToggle();
  const [isShowCalendar, handleOpenCalendar, handleCloseCalendar] = useToggle();

  const { handleDebouncedRegisterBottomSheet, isPostingTravelPlanPending } = useTravelPlanRegister(
    { title, startDate: extractUTCDate(startDate), days: travelPlanDays },
    handleBottomSheetClose,
  );

  useAuthRedirect();

  return (
    <>
      <S.Layout>
        <PageInfo
          mainText="여행 계획 등록"
          subText="여행 계획은 비공개지만, 링크를 통해 원하는 사람과 공유 할 수 있어요."
        />

        <TextField title="제목" isRequired>
          {(id) => (
            <S.InputContainer>
              <Input
                id={id}
                value={title}
                placeholder="여행 계획 제목을 입력해주세요"
                onChange={(event) => handleChangeTitle(event.target.value)}
                data-cy={CYPRESS_DATA_MAP.travelPlanRegister.titleInput}
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
                data-cy={CYPRESS_DATA_MAP.travelPlanRegister.startDateInput}
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
                <Text
                  textType="bodyBold"
                  data-cy={CYPRESS_DATA_MAP.travelPlanRegister.addDateButton}
                >
                  일자 추가하기
                </Text>
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
                <Text
                  textType="bodyBold"
                  data-cy={CYPRESS_DATA_MAP.travelPlanRegister.addDateButton}
                >
                  일자 추가하기
                </Text>
              </IconButton>
              {travelPlanDaysErrorMessage && (
                <Text textType="detail" css={S.errorTextStyle}>
                  {travelPlanDaysErrorMessage}
                </Text>
              )}
            </Accordion.Root>
          </GoogleMapLoadScript>
        </div>

        <Button
          variants="primary"
          onClick={handleBottomSheetOpen}
          disabled={!isEnabledForm}
          data-cy={CYPRESS_DATA_MAP.travelPlanRegister.registerButton}
        >
          등록
        </Button>
      </S.Layout>

      <EditRegisterModalBottomSheet
        isOpen={isOpenBottomSheet}
        isPending={isPostingTravelPlanPending}
        mainText="여행 계획을 등록할까요?"
        subText="등록한 후에도 다시 여행 계획을 수정할 수 있어요."
        onClose={handleBottomSheetClose}
        onConfirm={handleDebouncedRegisterBottomSheet}
      />
    </>
  );
};

export default TravelPlanRegisterPage;
