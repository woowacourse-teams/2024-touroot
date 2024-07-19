import { PropsWithChildren } from "react";

import * as S from "./Header.styled";

const Header = ({ children }: PropsWithChildren) => {
  return <S.HeaderLayout>{children}</S.HeaderLayout>;
};

export default Header;
