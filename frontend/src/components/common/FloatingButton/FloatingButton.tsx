import { useNavigate } from "react-router-dom";

import useModalControl from "@hooks/useModalControl";
import useToggle from "@hooks/useToggle";
import useUnmountAnimation from "@hooks/useUnmountAnimation";

import { removeEmoji } from "@utils/removeEmojis";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import FocusTrap from "../FocusTrap";
import IconButton from "../IconButton/IconButton";
import Text from "../Text/Text";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import SUB_BUTTONS from "./FloatingButton.constants";
import * as S from "./FloatingButton.styled";

const FloatingButton = () => {
  const [isOpen, , , handleToggleButton] = useToggle();
  const navigate = useNavigate();

  const handleClickSubButton = (route: string) => {
    navigate(route);
  };

  useModalControl(isOpen, handleToggleButton);
  const { isRendered } = useUnmountAnimation({ isOpen });

  return (
    <S.FloatingButtonContainer>
      <VisuallyHidden aria-live="assertive">
        {isOpen
          ? "여행기 및 여행 계획 작성 메뉴가 열렸습니다. 닫으려면 esc버튼을 눌러주세요."
          : "여행기 및 여행 계획 작성 메뉴가 닫혔습니다."}
      </VisuallyHidden>
      {isRendered && (
        <>
          <S.BackdropLayout $isOpen={isOpen} onClick={handleToggleButton} />
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
          title="여행 계획 및 여행기 작성 메뉴"
        />
      </S.MainButtonWrapper>
    </S.FloatingButtonContainer>
  );
};

export default FloatingButton;
