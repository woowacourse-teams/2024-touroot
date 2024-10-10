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

import useTravelPlanForm from "@hooks/pages/useTravelPlanForm";
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
      onChangeTitle,
      onSelectCalendar,
      onAddDay,
      onAddPlace,
      onDeleteDay,
      onDeletePlace,
      onAddPlaceTodo,
      onDeletePlaceTodo,
      onChangeContent,
    },
  } = useTravelPlanForm(transformDetail?.days ?? []);

  const [isOpenBottomSheet, handleBottomSheetOpen, handleBottomSheetClose] = useToggle();
  const [isShowCalendar, handleOpenCalendar, handleCloseCalendar] = useToggle();

  const { onConfirmBottomSheet, isPostingTravelPlanPending } = useTravelPlanRegister(
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
                maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
                placeholder="여행 계획 제목을 입력해주세요"
                onChange={(event) => onChangeTitle(event.target.value)}
                data-cy={CYPRESS_DATA_MAP.travelPlanRegister.titleInput}
              />
              <CharacterCount
                count={title.length}
                maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
              />
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
                  onSelectDate={(date) => onSelectCalendar(date, handleCloseCalendar)}
                  onClose={handleCloseCalendar}
                />
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
                onClick={() => onAddDay()}
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
                  onDeletePlaceTodo={onDeletePlaceTodo}
                  onChangeContent={onChangeContent}
                  travelPlanDay={travelDay}
                  dayIndex={dayIndex}
                  onAddPlace={onAddPlace}
                  onDeletePlace={onDeletePlace}
                  onDeleteDay={onDeleteDay}
                  onAddPlaceTodo={onAddPlaceTodo}
                />
              ))}
              <IconButton
                size="16"
                iconType="plus"
                position="left"
                css={S.addButtonStyle}
                onClick={onAddDay}
              >
                <Text
                  textType="bodyBold"
                  data-cy={CYPRESS_DATA_MAP.travelPlanRegister.addDateButton}
                >
                  일자 추가하기
                </Text>
              </IconButton>
            </Accordion.Root>
          </GoogleMapLoadScript>
        </div>

        <Button
          variants="primary"
          onClick={handleBottomSheetOpen}
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
        onConfirm={onConfirmBottomSheet}
      />
    </>
  );
};

export default TravelPlanRegisterPage;
