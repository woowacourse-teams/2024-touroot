import { Text } from "@components/common";

import { createAnimation } from "../Animation.styled";
import useAnimationObserver from "../hook/useAnimationObserver";
import * as S from "./FourthPage.styled";
import SpeechBubble from "./SpeechBubble/SpeechBubble";

const FourthPage = () => {
  const { registerElement, getAnimationState } = useAnimationObserver();

  return (
    <S.Layout>
      <Text textType="title" css={S.titleStyle}>
        투룻을 써본 사람들은 이런걸 좋아했어요! 💙
      </Text>

      <div
        ref={registerElement("SpeechBubble1")}
        css={createAnimation({
          shouldAnimate: getAnimationState("SpeechBubble1").shouldAnimate,
          animation: "fadeIn",
        })}
      >
        <SpeechBubble variants="left" name="🦹🏻‍️ 이OO">
          <Text textType="detailBold" css={S.largeText}>
            여자 친구랑 가는 여행 계획 세우는 게 너무 힘들었는데~ <br />
            다른 사람의 여행을 쉽게 여행 계획으로 가져올 수 있어서 좋아요!
          </Text>
        </SpeechBubble>
      </div>

      <div
        ref={registerElement("SpeechBubble2")}
        css={createAnimation({
          shouldAnimate: getAnimationState("SpeechBubble2").shouldAnimate,
          animation: "fadeIn",
          delay: 300,
        })}
      >
        <SpeechBubble variants="right" name="🙋🏻‍♀️ 최OO">
          <Text textType="detailBold" css={S.largeText}>
            친구가 여행 정보 좀 알려달라고 할 때 일일이 알려주기 귀찮았는데 <br />
            투룻을 사용하니 잘 정리된 정보로 전달할 수 있어서 좋았어요
          </Text>
        </SpeechBubble>
      </div>

      <div
        ref={registerElement("SpeechBubble3")}
        css={createAnimation({
          shouldAnimate: getAnimationState("SpeechBubble3").shouldAnimate,
          animation: "fadeIn",
          delay: 600,
        })}
      >
        <SpeechBubble variants="left" name="👨🏼‍🏭 심OO">
          <Text textType="detailBold" css={S.largeText}>
            나의 여행을 기록한 것이 <br />
            다른 사람에게도 도움이 되었다는 점이 뿌듯해요
          </Text>
        </SpeechBubble>
      </div>

      <div
        ref={registerElement("Text1")}
        css={[
          S.subtitleStyle,
          createAnimation({
            shouldAnimate: getAnimationState("Text1").shouldAnimate,
            animation: "fadeIn",
          }),
        ]}
      >
        <Text textType="subTitle">투룻 서비스를 이용해보세요! 😘</Text>
      </div>
    </S.Layout>
  );
};

export default FourthPage;
