import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import { usePostTravelPlan } from "@queries/usePostTravelPlan";

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
import useUser from "@hooks/useUser";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

import * as S from "./TravelPlanRegisterPage.styled";

const MIN_TITLE_LENGTH = 0;
const MAX_TITLE_LENGTH = 20;

const TravelPlanRegisterPage = () => {
  const { transformDetail, saveTransformDetail } = useTravelTransformDetailContext();

  const [title, setTitle] = useState("");

  const [startDate, setStartDate] = useState<Date | null>(null);

  const {
    travelPlanDays,
    onAddDay,
    onAddPlace,
    onDeleteDay,
    onChangePlaceDescription,
    onDeletePlace,
  } = useTravelPlanDays(transformDetail?.days ?? []);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.slice(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
    setTitle(title);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const handleRegisterTravelPlan = () => {
    const formattedStartDate = startDate
      ? new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0]
      : "";

    handleAddTravelPlan(
      { title, startDate: formattedStartDate, days: travelPlanDays },
      {
        onSuccess: (data) => {
          handleCloseBottomSheet();
          navigate(ROUTE_PATHS_MAP.travelPlan(data?.data?.id));
        },
      },
    );
  };

  const debouncedRegisterTravelPlan = useLeadingDebounce(() => handleRegisterTravelPlan(), 3000);

  const handleConfirmBottomSheet = () => {
    debouncedRegisterTravelPlan();
  };

  const { mutate: handleAddTravelPlan } = usePostTravelPlan();

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

  const [isShowCalendar, setIsShowCalendar] = useState(false);

  const handleInputClick = () => {
    setIsShowCalendar(true);
  };

  const handleSelectDate = (date: Date) => {
    setStartDate(date);
    setIsShowCalendar(false);
  };

  return (
    <>
      <S.Layout>
        <PageInfo mainText="여행 계획 등록" />
        <Input
          value={title}
          maxLength={MAX_TITLE_LENGTH}
          label="제목"
          placeholder="여행 계획 제목을 입력해주세요"
          count={title.length}
          maxCount={MAX_TITLE_LENGTH}
          onChange={handleChangeTitle}
        />
        <S.StartDateContainer>
          <S.StartDateLabel>시작일</S.StartDateLabel>
          <Text textType="detail" css={S.detailTextColorStyle}>
            시작일을 선택하면 마감일은 투룻이 계산 해드릴게요!
          </Text>
          <Input
            value={startDate ? startDate.toLocaleDateString().slice(0, -1) : ""}
            onClick={handleInputClick}
            readOnly
            placeholder="시작일을 입력해주세요"
          />
          {isShowCalendar && (
            <Calendar
              onSelectDate={handleSelectDate}
              onClose={() => setIsShowCalendar((prev) => !prev)}
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
                  css={[S.addButtonStyle, S.addDayButtonStyle, S.loadingButtonStyle]}
                  onClick={() => onAddDay()}
                >
                  일자 추가하기
                </IconButton>
              </S.LoadingWrapper>
            }
            libraries={["places", "maps"]}
          >
            <Accordion.Root>
              {travelPlanDays.map((travelDay, dayIndex) => (
                <TravelPlanDayAccordion
                  key={travelDay.id}
                  startDate={startDate}
                  travelPlanDay={travelDay}
                  dayIndex={dayIndex}
                  onAddPlace={onAddPlace}
                  onDeletePlace={onDeletePlace}
                  onDeleteDay={onDeleteDay}
                  onChangePlaceDescription={onChangePlaceDescription}
                />
              ))}
            </Accordion.Root>
            <IconButton
              size="16"
              iconType="plus"
              position="left"
              css={[S.addButtonStyle, S.addDayButtonStyle]}
              onClick={() => onAddDay()}
            >
              일자 추가하기
            </IconButton>
          </GoogleMapLoadScript>
          <Button variants="primary" onClick={handleOpenBottomSheet}>
            등록
          </Button>
        </S.AccordionRootContainer>
      </S.Layout>
      <ModalBottomSheet
        isOpen={isOpen}
        mainText="여행 계획을 등록할까요?"
        subText="등록한 후에도 다시 여행 계획을 수정할 수 있어요."
        onClose={handleCloseBottomSheet}
        onConfirm={handleConfirmBottomSheet}
      />
    </>
  );
};

export default TravelPlanRegisterPage;
