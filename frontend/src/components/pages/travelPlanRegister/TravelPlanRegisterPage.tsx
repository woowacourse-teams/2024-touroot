import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";
import { differenceInDays } from "date-fns";

import { usePostTravelPlan } from "@queries/usePostTravelPlan";

import {
  Accordion,
  Button,
  GoogleMapLoadScript,
  IconButton,
  Input,
  ModalBottomSheet,
  PageInfo,
} from "@components/common";
import DateRangePicker from "@components/common/DateRangePicker/DateRangePicker";
import TravelPlanDayAccordion from "@components/pages/travelPlanRegister/TravelPlanDayAccordion/TravelPlanDayAccordion";

import { useTravelPlanDays } from "@hooks/pages/useTravelPlanDays";
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
  const [endDate, setEndDate] = useState<Date | null>(null);

  const {
    travelPlanDays,
    onAddDay,
    onAddPlace,
    onDeleteDay,
    onChangePlaceDescription,
    onDeletePlace,
  } = useTravelPlanDays(transformDetail?.days ?? []);

  useEffect(() => {
    if (startDate && endDate) {
      const dayDiff = differenceInDays(endDate, startDate) + 1;

      onAddDay(dayDiff);
    }
  }, [startDate, endDate, onAddDay]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

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

  const handleConfirmBottomSheet = async () => {
    if (!startDate) return;

    const formattedStartDate = startDate.toISOString().split("T")[0];

    handleAddTravelPlan(
      { id: "", title, shareKey: "", startDate: formattedStartDate, days: travelPlanDays },
      {
        onSuccess: ({ data: { id } }) => {
          handleCloseBottomSheet();
          navigate(ROUTE_PATHS_MAP.travelPlan(id));
        },
      },
    );
    handleCloseBottomSheet();
  };

  const { mutateAsync: handleAddTravelPlan } = usePostTravelPlan();

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
        <PageInfo mainText="여행 계획 등록" />
        <Input
          value={title}
          maxLength={MAX_TITLE_LENGTH}
          label="제목"
          count={title.length}
          maxCount={MAX_TITLE_LENGTH}
          onChange={handleChangeTitle}
        />

        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={handleStartDateChange}
          onChangeEndDate={handleEndDateChange}
        />

        <S.AccordionRootContainer>
          <GoogleMapLoadScript libraries={["places", "maps"]}>
            <Accordion.Root>
              {travelPlanDays.map((travelDay, dayIndex) => (
                <TravelPlanDayAccordion
                  key={`${travelDay}-${dayIndex}`}
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
