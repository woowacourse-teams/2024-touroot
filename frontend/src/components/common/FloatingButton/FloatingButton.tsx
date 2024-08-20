import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_PATHS_MAP } from "@constants/route";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import IconButton from "../IconButton/IconButton";
import Modal from "../Modal/Modal";
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

  return (
    <S.FloatingButtonContainer>
      {isOpen && <Modal isOpen={isOpen} onCloseModal={handleToggleButton} />}
      <S.SubButtonContainer $isOpen={isOpen}>
        <button onClick={handleClickTravelPlanRegister}>
          <Text textType="body" css={S.subButtonTextStyle}>
            ✈️ 여행 계획 작성
          </Text>
        </button>
        <button onClick={handleClickTravelogueRegister}>
          <Text textType="body" css={S.subButtonTextStyle}>
            📝 여행기 작성
          </Text>
        </button>
      </S.SubButtonContainer>

      <S.MainButtonWrapper onClick={handleToggleButton} $isOpen={isOpen}>
        <IconButton iconType="plus" color={PRIMITIVE_COLORS.white} size="20" />
      </S.MainButtonWrapper>
    </S.FloatingButtonContainer>
  );
};

export default FloatingButton;
