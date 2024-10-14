import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useModalControl from "@hooks/useModalControl";

import { removeEmoji } from "@utils/removeEmojis";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import FocusTrap from "../FocusTrap";
import IconButton from "../IconButton/IconButton";
import Text from "../Text/Text";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import * as S from "./FloatingButton.styled";
import SUB_BUTTONS from "./constants";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleButton = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickSubButton = (route: string) => {
    navigate(route);
  };

  useModalControl(isOpen, handleToggleButton);

  return (
    <S.FloatingButtonContainer>
      <VisuallyHidden aria-live="assertive">
        {isOpen
          ? "여행기 및 여행 계획 작성 모달이 열렸습니다. 닫으려면 esc버튼을 눌러주세요."
          : "여행기 및 여행 계획 작성 모달이 닫혔습니다."}
      </VisuallyHidden>
      {isOpen && (
        <>
          <S.BackdropLayout onClick={handleToggleButton} />
          <FocusTrap>
            <S.SubButtonContainer $isOpen={isOpen}>
              {SUB_BUTTONS.map(({ text, route }) => (
                <S.SubButton
                  key={route}
                  onClick={() => handleClickSubButton(route)}
                  aria-label={removeEmoji(text)}
                >
                  <Text textType="body" css={S.subButtonTextStyle}>
                    {text}
                  </Text>
                </S.SubButton>
              ))}
            </S.SubButtonContainer>
          </FocusTrap>
        </>
      )}

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
