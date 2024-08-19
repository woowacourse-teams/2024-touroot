import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useGetTravelPlan } from "@queries/useGetTravelPlan";
import { usePutTravelPlan } from "@queries/usePutTravelPlan";

import {
  Accordion,
  Button,
  GoogleMapLoadScript,
  IconButton,
  Input,
  ModalBottomSheet,
  PageInfo,
  Text,
} from "@components/common";
import Calendar from "@components/common/Calendar/Calendar";
import TravelPlanDayAccordion from "@components/pages/travelPlanRegister/TravelPlanDayAccordion/TravelPlanDayAccordion";

import { useTravelPlanDays } from "@hooks/pages/useTravelPlanDays";
import useLeadingDebounce from "@hooks/useLeadingDebounce";

import { DEBOUNCED_TIME } from "@constants/debouncedTime";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { ROUTE_PATHS_MAP } from "@constants/route";

import { extractId } from "@utils/extractId";
import { extractUTCDate } from "@utils/extractUTCDate";

import theme from "@styles/theme";

import * as S from "./TravelPlanEditPage.styled";

const TravelPlanEditPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const id = extractId(location.pathname);

  const { data, status, error } = useGetTravelPlan(id);

  const [title, setTitle] = useState("");

  const [startDate, setStartDate] = useState<Date | null>(null);

  const {
    travelPlanDays,
    onChangeTravelPlanDays,
    onAddDay,
    onAddPlace,
    onDeleteDay,
    onDeletePlace,
    onAddPlaceTodo,
    onDeletePlaceTodo,
    onChangeContent,
  } = useTravelPlanDays([]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.slice(
      FORM_VALIDATIONS_MAP.title.minLength,
      FORM_VALIDATIONS_MAP.title.maxLength,
    );
    setTitle(title);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
  };

  const { mutate: mutateTravelPlanEdit } = usePutTravelPlan();

  const handleEditTravelPlan = () => {
    const formattedStartDate = extractUTCDate(startDate);

    mutateTravelPlanEdit(
      {
        travelPlan: { title, startDate: formattedStartDate, days: travelPlanDays },
        id: Number(id),
      },
      {
        onSuccess: (data) => {
          handleCloseBottomSheet();
          navigate(ROUTE_PATHS_MAP.travelPlan(data?.data?.id));
        },
      },
    );
  };

  const debouncedEditTravelPlan = useLeadingDebounce(() => handleEditTravelPlan(), DEBOUNCED_TIME);

  const handleConfirmBottomSheet = () => {
    debouncedEditTravelPlan();
  };

  const [isShowCalendar, setIsShowCalendar] = useState(false);

  const handleInputClick = () => {
    setIsShowCalendar(true);
  };

  const handleSelectDate = (date: Date) => {
    setStartDate(date);
    setIsShowCalendar(false);
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setStartDate(new Date(data.startDate));
      onChangeTravelPlanDays(data.days);
    }
  }, [data, onChangeTravelPlanDays]);

  if (status === "error") {
    const errorMessage =
      error.message === ERROR_MESSAGE_MAP.api.travelPlanOnlyWriter
        ? ERROR_MESSAGE_MAP.api.travelPlanEditOnlyWriter
        : error.message;

    alert(errorMessage);
    navigate(ROUTE_PATHS_MAP.back);
  }

  return (
    <>
      <S.Layout>
        <PageInfo mainText="여행 계획 수정" />
        <Input
          value={title}
          maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
          label="제목"
          placeholder="여행 계획 제목을 입력해주세요"
          count={title.length}
          maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
          onChange={handleChangeTitle}
        />
        <S.StartDateContainer>
          <Text textType="bodyBold">시작일</Text>
          <Text textType="detail" color={theme.colors.text.secondary}>
            시작일을 선택하면 마감일은 투룻이 계산 해드릴게요!
          </Text>
          <Input
            value={startDate ? startDate.toLocaleDateString().slice(0, -1) : ""}
            onClick={handleInputClick}
            readOnly
            placeholder="시작일을 입력해주세요"
            css={S.startDateInputStyle}
          />
          {isShowCalendar && (
            <Calendar
              onSelectDate={handleSelectDate}
              onClose={() => setIsShowCalendar((prev) => !prev)}
              css={S.calendarStyle}
            />
          )}
        </S.StartDateContainer>
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
                  <Text textType="bodyBold">일자 추가하기</Text>
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
              onClick={() => onAddDay()}
            >
              <Text textType="bodyBold">일자 추가하기</Text>
            </IconButton>
          </GoogleMapLoadScript>
          <Button variants="primary" onClick={handleOpenBottomSheet}>
            수정
          </Button>
        </S.AccordionRootContainer>
      </S.Layout>
      {isOpen && (
        <ModalBottomSheet
          isOpen={isOpen}
          mainText="여행 계획을 수정할까요?"
          subText="수정한 후에도 다시 여행 계획을 변경할 수 있어요."
          secondaryButtonLabel="취소"
          primaryButtonLabel="확인"
          onClose={handleCloseBottomSheet}
          onConfirm={handleConfirmBottomSheet}
        />
      )}
    </>
  );
};

export default TravelPlanEditPage;
