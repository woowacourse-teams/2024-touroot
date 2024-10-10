import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useModalControl from "@hooks/useModalControl";

import { ROUTE_PATHS_MAP } from "@constants/route";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import IconButton from "../IconButton/IconButton";
import Text from "../Text/Text";
import * as S from "./FloatingButton.styled";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleButton = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickTravelogueRegister = () => {
    navigate(ROUTE_PATHS_MAP.travelogueRegister);
  };

  const handleClickTravelPlanRegister = () => {
    navigate(ROUTE_PATHS_MAP.travelPlanRegister);
  };

  useModalControl(isOpen, handleToggleButton);

  return (
    <S.FloatingButtonContainer>
      {isOpen && <S.BackdropLayout onClick={handleToggleButton} />}
      <S.SubButtonContainer $isOpen={isOpen}>
        <S.SubButton onClick={handleClickTravelPlanRegister}>
          <Text textType="body" css={S.subButtonTextStyle}>
            ✈️ 여행 계획 작성
          </Text>
        </S.SubButton>
        <S.SubButton onClick={handleClickTravelogueRegister}>
          <Text textType="body" css={S.subButtonTextStyle}>
            📝 여행기 작성
          </Text>
        </S.SubButton>
      </S.SubButtonContainer>

      <S.MainButtonWrapper onClick={handleToggleButton} $isOpen={isOpen}>
        <IconButton
          iconType="plus"
          color={PRIMITIVE_COLORS.white}
          size="20"
          title="여행 계획 및 여행기 작성 플로팅"
        />
      </S.MainButtonWrapper>
    </S.FloatingButtonContainer>
  );
};

export default FloatingButton;
