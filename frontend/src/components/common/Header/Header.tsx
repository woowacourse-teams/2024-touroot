import { useLocation, useNavigate } from "react-router-dom";

import IconButton from "@components/common/IconButton/IconButton";

import { ROUTE_PATHS } from "@constants/route";

import * as S from "./Header.styled";

const HeaderTitle = ({ title }: { title: string }) => <S.HeaderTitle>{title}</S.HeaderTitle>;

const Header = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const navigate = useNavigate();

  const handleClickButton =
    pathName === ROUTE_PATHS.root ? () => navigate(-1) : () => navigate(ROUTE_PATHS.root);

  return (
    <S.HeaderLayout>
      <IconButton
        onClickButton={handleClickButton}
        variants={pathName === ROUTE_PATHS.root ? "logo" : "back"}
      />
      {pathName === ROUTE_PATHS.login ? (
        <>
          <HeaderTitle title="로그인" />
          <S.HiddenDiv />
        </>
      ) : (
        <IconButton onClickButton={() => {}} variants="hamburger" />
      )}
    </S.HeaderLayout>
  );
};

export default Header;
