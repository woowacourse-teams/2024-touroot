import { PropsWithChildren } from "react";

import * as S from "./Footer.styled";

const Footer: React.FC<PropsWithChildren> = ({ children }) => {
  return <S.Footer>{children}</S.Footer>;
};

export default Footer;
