import { useEffect, useRef } from "react";

import FirstPage from "./FirstPage/FirstPage";
import FourthPage from "./FourthPage/FourthPage";
import * as S from "./LandingPage.styled";
import SecondPage from "./SecondPage/SecondPage";
import ThirdPage from "./ThirdPage/ThirdPage";

const LandingPage = () => {
  const secondPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const secondPage = secondPageRef.current;

      if (secondPage) {
        const translateY = Math.max(-11, 70 - ((scrollPosition / window.innerHeight) * 100 + 70));
        secondPage.style.transform = `translateY(${translateY}vh)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    </S.Layout>
  );
};

export default LandingPage;
