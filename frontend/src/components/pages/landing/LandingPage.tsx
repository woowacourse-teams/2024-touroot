import TopButton from "@components/common/TopButton/TopButton";

import FirstPage from "./FirstPage/FirstPage";
import FourthPage from "./FourthPage/FourthPage";
import * as S from "./LandingPage.styled";
import SecondPage from "./SecondPage/SecondPage";
import ThirdPage from "./ThirdPage/ThirdPage";
import useScrollAnimation from "./hook/useScrollAnimation";

const LandingPage = () => {
  const [secondPageRef] = useScrollAnimation();

  return (
    <S.Layout>
      <S.PageWrapper>
        <div css={S.firstPageStyle}>
          <FirstPage />
        </div>
        <div css={S.secondPageStyle} ref={secondPageRef}>
          <SecondPage />
        </div>
      </S.PageWrapper>
      <ThirdPage />
      <FourthPage />
      <TopButton />
    </S.Layout>
  );
};

export default LandingPage;
