// FloatingButton.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { UserContext } from "@contexts/UserProvider";
import Icon from "@components/common/Icon/Icon";

import { ROUTE_PATHS } from "@constants/route";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import * as S from "./FloatingButton.styled";

const FloatingButton = () => {
  // const { user } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleButton = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickRegisterButton = () => {
    // if (user === null) {
    //   alert("여행기 작성 전 로그인을 먼저 해주세요!");
    //   return;
    // }
    navigate(ROUTE_PATHS.travelogueRegister);
  };

  const handleClickShareButton = () => {};

  return (
    <S.Container>
      <S.ButtonGroup $isOpen={isOpen}>
        <S.Button
          onClick={handleClickRegisterButton}
          $isPrimary={false}
          $index={2}
          $isOpen={isOpen}
        >
          <Icon color={PRIMITIVE_COLORS.white} size="24" iconType="edit" />
        </S.Button>
        <S.Button onClick={handleClickShareButton} $isPrimary={false} $index={1} $isOpen={isOpen}>
          <Icon color={PRIMITIVE_COLORS.white} size="36" iconType="up-arrow-with-bar" />
        </S.Button>
      </S.ButtonGroup>
      <S.MainButton onClick={handleToggleButton} $isPrimary={true} $isOpen={isOpen}>
        <Icon color={PRIMITIVE_COLORS.white} size="24" iconType={"plus"} />
      </S.MainButton>
    </S.Container>
  );
};

export default FloatingButton;
