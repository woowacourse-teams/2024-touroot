import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import { usePostTravelPlan } from "@queries/usePostTravelPlan";

import {
  Accordion,
  Button,
  Calendar,
  GoogleMapLoadScript,
  IconButton,
  Input,
  ModalBottomSheet,
  PageInfo,
  TextField,
} from "@components/common";
import TravelPlanDayAccordion from "@components/pages/travelPlanRegister/TravelPlanDayAccordion/TravelPlanDayAccordion";

import { useTravelPlanDays } from "@hooks/pages/useTravelPlanDays";
import useLeadingDebounce from "@hooks/useLeadingDebounce";
import useUser from "@hooks/useUser";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { ROUTE_PATHS_MAP } from "@constants/route";

import * as S from "./TravelPlanRegisterPage.styled";

const TravelPlanRegisterPage = () => {
  const { transformDetail, saveTransformDetail } = useTravelTransformDetailContext();

  const [title, setTitle] = useState("");

  const [startDate, setStartDate] = useState<Date | null>(null);

  const {
    travelPlanDays,
    onAddDay,
    onAddPlace,
    onDeleteDay,
    onDeletePlace,
    onAddPlaceTodo,
    onDeletePlaceTodo,
    onChangeContent,
  } = useTravelPlanDays(transformDetail?.days ?? []);

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
        <TextField title="제목" isRequired>
          <Input
            value={title}
            maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
            placeholder="여행 계획 제목을 입력해주세요"
            count={title.length}
            maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
            onChange={handleChangeTitle}
          />
        </TextField>

        <TextField
          title="시작일"
          subTitle="시작일을 선택하면 마감일은 투룻이 계산 해드릴게요!"
          isRequired
        >
          <>
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
          </>
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
                  일자 추가하기
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
