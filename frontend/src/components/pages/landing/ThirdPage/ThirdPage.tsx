import { Text } from "@components/common";

import { TravelogueDetailPageImage, travelPlanDetailPageImage } from "@assets/webp";

import { createAnimation } from "../Animation.styled";
import Box from "../components/Box";
import useAnimationObserver from "../hook/useAnimationObserver";
import * as S from "./ThirdPage.styled";
import Title from "./Title/Title";

const ThirdPage = () => {
  const { registerElement, getAnimationState } = useAnimationObserver();

  return (
    <div css={S.layout}>
      <Title>
        <Text textType="subTitle">여행 계획으로 가져오기</Text>
      </Title>
      <section css={S.sectionLeft}>
        <img
          src={TravelogueDetailPageImage}
          alt="여행기 상세 페이지"
          ref={registerElement("Image1")}
          css={[
            S.image,
            createAnimation({
              shouldAnimate: getAnimationState("Image1").shouldAnimate,
              animation: "fadeIn",
              delay: 300,
            }),
          ]}
        />
        <Box
          ref={registerElement("Box1")}
          css={[
            S.boxRight,
            createAnimation({
              shouldAnimate: getAnimationState("Box1").shouldAnimate,
              animation: "fadeIn",
              delay: 600,
            }),
          ]}
        >
          <Text>마음에 드는 여행기를 단 한 번의 클릭으로</Text>
          <Text>👉🏻 내 여행 계획으로 가져올 수 있어요</Text>
        </Box>
      </section>

      <Title>
        <Text textType="subTitle">여행기로 가져오기</Text>
      </Title>

      <section css={S.sectionRight}>
        <img
          src={travelPlanDetailPageImage}
          alt="여행 계획 상세 페이지"
          ref={registerElement("Image2")}
          css={[
            S.image,
            createAnimation({
              shouldAnimate: getAnimationState("Image2").shouldAnimate,
              animation: "fadeIn",
              delay: 300,
            }),
          ]}
        />
        <Box
          ref={registerElement("Box2")}
          css={[
            S.boxLeft,
            createAnimation({
              shouldAnimate: getAnimationState("Box2").shouldAnimate,
              animation: "fadeIn",
              delay: 600,
            }),
          ]}
        >
          <Text>작성한 내 여행 계획을</Text>
          <Text>손쉽게 여행기로 남길 수 있어요 ✍🏻</Text>
        </Box>
      </section>
    </div>
  );
};

export default ThirdPage;
