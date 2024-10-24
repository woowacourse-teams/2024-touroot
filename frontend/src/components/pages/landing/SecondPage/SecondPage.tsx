import { Text } from "@components/common";

import { MainPageImage } from "@assets/webp";

import { createAnimation } from "../Animation.styled";
import Box from "../components/Box";
import useAnimationObserver from "../hook/useAnimationObserver";
import * as S from "./SecondPage.styled";

const SecondPage = () => {
  const { registerElement, getAnimationState } = useAnimationObserver();

  return (
    <div css={S.layout}>
      <div css={S.contentContainer}>
        <Box
          ref={registerElement("Box1")}
          css={[
            S.widthEightyPercent,
            createAnimation({
              shouldAnimate: getAnimationState("Box1").shouldAnimate,
              animation: "fadeIn",
            }),
          ]}
        >
          <div css={S.boxContainer}>
            <Text css={S.emojiText}>🤔</Text>
            <div>
              <Text isInline>다른 사람의 여행을 </Text>
              <Text isInline textType="bodyBold">
                따라가고 싶은데,
              </Text>
            </div>
          </div>
          <div>
            <Text isInline>정리하기는 </Text>
            <Text textType="bodyBold" isInline>
              귀찮은 적{" "}
            </Text>
            <Text isInline>있지 않으셨나요?</Text>
          </div>
        </Box>

        <Box
          ref={registerElement("Box2")}
          css={[
            S.relativeBox,
            createAnimation({
              shouldAnimate: getAnimationState("Box2").shouldAnimate,
              animation: "fadeIn",
              delay: 600,
            }),
          ]}
        >
          <Text css={S.absoluteEmojiText}>🤯</Text>
          <div css={S.textAlignRight}>
            <Text isInline>방대한 양의 여행을 </Text>
            <Text textType="bodyBold" isInline>
              어떻게 기록할지
            </Text>
          </div>
          <div css={S.textAlignRight}>
            <Text textType="bodyBold" isInline>
              막막한 적
            </Text>
            <Text isInline>있지 않으셨나요?</Text>
          </div>
        </Box>
      </div>

      <section css={S.section}>
        <div
          ref={registerElement("Text1")}
          css={[
            S.textContainer,
            createAnimation({
              shouldAnimate: getAnimationState("Text1").shouldAnimate,
              animation: "fadeIn",
              delay: 900,
            }),
          ]}
        >
          <div>
            <Text textType="subTitle" isInline css={S.primaryText}>
              단 한 번의 클릭
            </Text>
            <Text textType="subTitle" isInline css={S.fontWeightMedium}>
              으로
            </Text>
          </div>
          <div>
            <Text textType="subTitle" isInline>
              다른 사람의 여행
            </Text>
            <Text textType="subTitle" isInline css={S.fontWeightMedium}>
              이
            </Text>
          </div>
          <div>
            <Text textType="subTitle" isInline>
              나의 여행 계획
            </Text>
            <Text textType="subTitle" isInline css={S.fontWeightMedium}>
              으로 바뀌고
            </Text>
          </div>
        </div>

        <img
          src={MainPageImage}
          alt="투룻 메인 페이지 이미지"
          ref={registerElement("Image1")}
          css={[
            S.mainImage,
            createAnimation({
              shouldAnimate: getAnimationState("Image1").shouldAnimate,
              animation: "fadeIn",
            }),
          ]}
        />

        <div
          ref={registerElement("Text2")}
          css={[
            S.textContainer,
            createAnimation({
              shouldAnimate: getAnimationState("Text2").shouldAnimate,
              animation: "fadeIn",
            }),
          ]}
        >
          <div>
            <Text textType="subTitle" isInline>
              미리 준비된 템플릿
            </Text>
            <Text textType="subTitle" isInline css={S.fontWeightMedium}>
              을 따라
            </Text>
          </div>
          <div>
            <Text textType="subTitle" isInline>
              간편하게 여행
            </Text>
            <Text textType="subTitle" isInline css={S.fontWeightMedium}>
              을{" "}
            </Text>
            <Text textType="subTitle" isInline css={S.primaryText}>
              기록할 수 있는 곳
            </Text>
          </div>
        </div>
      </section>

      <Box
        ref={registerElement("Box4")}
        css={[
          S.bottomBox,
          createAnimation({
            shouldAnimate: getAnimationState("Box4").shouldAnimate,
            animation: "fadeIn",
            delay: 300,
          }),
        ]}
      >
        <div css={S.bottomTextContainer}>
          <Text>귀찮은 기억은 내려놓고</Text>
          <div>
            <Text textType="bodyBold" isInline>
              즐거운 기억
            </Text>
            <Text isInline>만 가져갈 수 있도록</Text>
          </div>
        </div>

        <div css={S.centeredTextContainer}>
          <Text textType="subTitle" isInline css={S.primaryText}>
            투룻
          </Text>
          <Text textType="subTitle" isInline>
            이 도와줄게요!
          </Text>
        </div>
      </Box>
    </div>
  );
};

export default SecondPage;
