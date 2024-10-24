import TopButton from "@components/common/TopButton/TopButton";

import FirstPage from "./FirstPage/FirstPage";
import FourthPage from "./FourthPage/FourthPage";
import * as S from "./LandingPage.styled";
import SecondPage from "./SecondPage/SecondPage";
import ThirdPage from "./ThirdPage/ThirdPage";

const LandingPage = () => {
  return (
    <S.Layout>
      <S.PageWrapper>
        <div css={S.firstPageStyle}>
          <FirstPage />
        </div>
        <SecondPage />
      </S.PageWrapper>
      <ThirdPage />
      <FourthPage />
      <TopButton />
    </S.Layout>
  );
};

export default LandingPage;
