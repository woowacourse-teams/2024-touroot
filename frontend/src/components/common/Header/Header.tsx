import { BackIcon, Hamburger } from "@assets/svg";

import * as S from "./Header.styled";

const Header = () => {
  return (
    <S.HeaderLayout>
      <BackIcon />
      <Hamburger />
    </S.HeaderLayout>
  );
};

export default Header;
