import { useNavigate } from "react-router-dom";

import { ROUTE_PATHS_MAP } from "@constants/route";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import IconButton from "../IconButton/IconButton";
import * as S from "./FloatingButton.styled";

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClickRegisterButton = () => {
    navigate(ROUTE_PATHS_MAP.travelogueRegister);
  };

  return (
    <IconButton
      iconType="edit"
      color={PRIMITIVE_COLORS.white}
      onClick={handleClickRegisterButton}
      css={S.registerButtonStyle}
    />
  );
};

export default FloatingButton;
