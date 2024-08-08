import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import useInfiniteMyTravelPlans from "@queries/useInfiniteMyTravelPlans";

import { IconButton, Text } from "@components/common";
import MyPageTabContentSkeleton from "@components/pages/my/MyPageTabContentSkeleton/MyPageTabContentSkeleton";

import useIntersectionObserver from "@hooks/useIntersectionObserver";

import { ROUTE_PATHS_MAP } from "@constants/route";

import addDaysToDateString from "@utils/addDaysToDateString";

import theme from "@styles/theme";

import TabContent from "../MyPageTabContent/MyPageTabContent";
import * as S from "./MyTravelPlans.styled";

const MyTravelPlans = () => {
  const { onTransformTravelDetail } = useTravelTransformDetailContext();
  const navigate = useNavigate();

  const { myTravelPlans, status, fetchNextPage } = useInfiniteMyTravelPlans();
  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  const handleClickAddButton = () => {
    navigate(ROUTE_PATHS_MAP.travelPlanRegister);
  };

  const handleClickTravelPlan = (id: string) => {
    navigate(ROUTE_PATHS_MAP.travelPlan(Number(id)));
  };

  if (status === "pending") return <MyPageTabContentSkeleton />;

  return (
    <>
      <TabContent
        iconButtonLabel="새 여행 계획 추가하기"
        onClickIconButton={handleClickAddButton}
        contentDetail={myTravelPlans}
        renderItem={({ id, title, startDate, days }) => (
          <S.Layout onClick={() => handleClickTravelPlan(id)}>
            <S.Container>
              <Text
                textType="body"
                css={css`
                  font-weight: 500;
                `}
              >
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
