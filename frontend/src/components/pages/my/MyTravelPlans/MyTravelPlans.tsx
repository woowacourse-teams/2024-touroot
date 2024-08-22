import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import type { UserResponse } from "@type/domain/user";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import useInfiniteMyTravelPlans from "@queries/useInfiniteMyTravelPlans";

import { IconButton, Text } from "@components/common";
import MyPageTabContentSkeleton from "@components/pages/my/MyPageTabContentSkeleton/MyPageTabContentSkeleton";

import useIntersectionObserver from "@hooks/useIntersectionObserver";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

import addDaysToDateString from "@utils/addDaysToDateString";

import theme from "@styles/theme";

import TabContent from "../MyPageTabContent/MyPageTabContent";
import * as S from "./MyTravelPlans.styled";

interface MyTravelPlansProps {
  userData: UserResponse;
}

const MyTravelPlans = ({ userData }: MyTravelPlansProps) => {
  const { onTransformTravelDetail } = useTravelTransformDetailContext();
  const navigate = useNavigate();

  const { myTravelPlans, status, fetchNextPage, isPaused, error } =
    useInfiniteMyTravelPlans(userData);
  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  const handleClickAddButton = () => {
    navigate(ROUTE_PATHS_MAP.travelPlanRegister);
  };

  const handleClickTravelPlan = (id: string) => {
    navigate(ROUTE_PATHS_MAP.travelPlan(Number(id)));
  };

  useEffect(() => {
    if (isPaused) alert(ERROR_MESSAGE_MAP.network);
  }, [isPaused]);

  if (status === "pending") return <MyPageTabContentSkeleton />;

  if (error) alert(error.message);

  return (
    <>
      <TabContent
        iconButtonLabel="새 여행 계획 추가하기"
        onClickIconButton={handleClickAddButton}
        contentDetail={myTravelPlans}
        renderItem={({ id, title, startDate, days }) => (
          <S.Layout onClick={() => handleClickTravelPlan(id)}>
            <S.Container>
              <Text textType="bodyBold" css={S.titleStyle}>
                {title}
              </Text>
              <Text
                textType="detail"
                css={css`
                  color: ${theme.colors.text.secondary};
                `}
              >
                {days.length !== 1
                  ? `${startDate} - ${addDaysToDateString({
                      dateString: startDate,
                      daysToAdd: days.length - 1,
                    })}`
                  : `${startDate}`}
              </Text>
            </S.Container>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onTransformTravelDetail(ROUTE_PATHS_MAP.travelogueRegister, { days: days ?? [] });
              }}
              size="16"
              position="left"
              iconType="plus"
              css={S.iconButtonStyle}
            >
              여행기로 전환
            </IconButton>
          </S.Layout>
        )}
      />
      <div
        ref={lastElementRef}
        css={css`
          height: 1px;
        `}
      />
    </>
  );
};

export default MyTravelPlans;
