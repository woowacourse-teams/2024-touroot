import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import { usePostTravelPlan } from "@queries/usePostTravelPlan";

import {
  Accordion,
  Button,
  Calendar,
  EditRegisterModalBottomSheet,
  GoogleMapLoadScript,
  IconButton,
  Input,
  PageInfo,
  Text,
  TextField,
} from "@components/common";
import TravelPlanDayAccordion from "@components/pages/travelPlanRegister/TravelPlanDayAccordion/TravelPlanDayAccordion";

import useTravelPlanForm from "@hooks/pages/useTravelPlanForm";
import useLeadingDebounce from "@hooks/useLeadingDebounce";
import useUser from "@hooks/useUser";

import { CYPRESS_DATA_MAP } from "@constants/cypress";
import { DEBOUNCED_TIME } from "@constants/debouncedTime";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { ROUTE_PATHS_MAP } from "@constants/route";

import { extractUTCDate } from "@utils/extractUTCDate";

import * as S from "./TravelPlanRegisterPage.styled";

const TravelPlanRegisterPage = () => {
  /** form */
  const { transformDetail, saveTransformDetail } = useTravelTransformDetailContext();

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

  /** ui */
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);

  const handleOpenBottomSheet = () => setIsOpenBottomSheet(true);

  const handleCloseBottomSheet = () => setIsOpenBottomSheet(false);

  const [isShowCalendar, setIsShowCalendar] = useState(false);

  const handleOpenCalendar = () => setIsShowCalendar(true);

  const handleCloseCalendar = () => setIsShowCalendar(() => false);

  /** router */
  const navigate = useNavigate();

  /** server */
  const { mutate: mutateTravelPlanRegister, isPending: isPostingTravelPlanPending } =
    usePostTravelPlan();

  const handleRegisterTravelPlan = () => {
    const travelPlanPayload = { title, startDate: extractUTCDate(startDate), days: travelPlanDays };

    mutateTravelPlanRegister(travelPlanPayload, {
      onSuccess: (data) => {
        const travelPlanId = data?.data?.id;

        handleCloseBottomSheet();
        navigate(ROUTE_PATHS_MAP.travelPlan(travelPlanId));
      },
    });
  };

  const handleConfirmBottomSheet = useLeadingDebounce(
    () => handleRegisterTravelPlan(),
    DEBOUNCED_TIME,
  );

  /** authorization */
  const { user } = useUser();

  useEffect(() => {
    if (!user?.accessToken) {
      alert(ERROR_MESSAGE_MAP.api.login);
      navigate(ROUTE_PATHS_MAP.login);
    }
    return () => {
      saveTransformDetail(null);
    };
  }, [user?.accessToken, navigate, saveTransformDetail]);

  return (
    <>
      <S.Layout>
        <PageInfo
          mainText="여행 계획 등록"
          subText="여행 계획은 비공개지만, 링크를 통해 원하는 사람과 공유 할 수 있어요."
        />
        <TextField title="제목" isRequired>
          {(id) => (
            <Input
              id={id}
              value={title}
              maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
              placeholder="여행 계획 제목을 입력해주세요"
              count={title.length}
              maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
              onChange={(event) => onChangeTitle(event.target.value)}
              data-cy={CYPRESS_DATA_MAP.travelPlanRegister.titleInput}
            />
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
                css={S.startDateInputStyle}
                data-cy={CYPRESS_DATA_MAP.travelPlanRegister.startDateInput}
              />
              {isShowCalendar && (
                <Calendar
                  onSelectDate={(date) => onSelectCalendar(date, handleCloseCalendar)}
                  onClose={handleCloseCalendar}
                  css={S.calendarStyle}
                />
              )}
            </>
          )}
        </TextField>
        <S.AccordionRootContainer>
          <GoogleMapLoadScript
            loadingElement={
              <S.LoadingWrapper>
                <IconButton
                  size="16"
                  iconType="plus"
                  position="left"
                  css={[S.addButtonStyle, S.loadingButtonStyle]}
                  onClick={() => onAddDay()}
                >
                  <Text
                    textType="bodyBold"
                    data-cy={CYPRESS_DATA_MAP.travelPlanRegister.addDateButton}
                  >
                    일자 추가하기
                  </Text>
                </IconButton>
              </S.LoadingWrapper>
            }
            libraries={["places", "maps"]}
          >
            <Accordion.Root css={S.accordionRootStyle}>
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
            </Accordion.Root>
            <IconButton
              size="16"
              iconType="plus"
              position="left"
              css={[S.addButtonStyle]}
              onClick={onAddDay}
            >
              <Text textType="bodyBold" data-cy={CYPRESS_DATA_MAP.travelPlanRegister.addDateButton}>
                일자 추가하기
              </Text>
            </IconButton>
          </GoogleMapLoadScript>
          <Button
            variants="primary"
            onClick={handleOpenBottomSheet}
            data-cy={CYPRESS_DATA_MAP.travelPlanRegister.registerButton}
          >
            등록
          </Button>
        </S.AccordionRootContainer>
      </S.Layout>

      {isOpenBottomSheet && (
        <EditRegisterModalBottomSheet
          isOpen={isOpenBottomSheet}
          isPending={isPostingTravelPlanPending}
          mainText="여행 계획을 등록할까요?"
          subText="등록한 후에도 다시 여행 계획을 수정할 수 있어요."
          onClose={handleCloseBottomSheet}
          onConfirm={handleConfirmBottomSheet}
        />
      )}
    </>
  );
};

export default TravelPlanRegisterPage;
