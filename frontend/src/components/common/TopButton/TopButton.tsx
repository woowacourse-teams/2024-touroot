import IconButton from "@components/common/IconButton/IconButton";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import * as S from "./TopButton.styled";

const TopButton = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <S.FloatingButtonContainer onClick={handleScrollTop}>
      <S.MainButtonWrapper>
        <IconButton
          iconType="up-arrow"
          color={PRIMITIVE_COLORS.white}
          size="20"
          title="여행 계획 및 여행기 작성 메뉴"
        />
      </S.MainButtonWrapper>
    </S.FloatingButtonContainer>
  );
};

export default TopButton;
