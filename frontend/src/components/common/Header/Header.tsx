import { BackIcon, DoubleRightArrow, Hamburger } from "@assets/svg";

import { useLocation, useNavigate } from "react-router-dom";

import IconButton from "@components/common/IconButton/IconButton";

import { ROUTE_PATHS } from "@constants/route";

import Drawer from "../Drawer/Drawer";
import * as S from "./Header.styled";

const headerMenus = ["마이페이지", "로그아웃"];

const HeaderTitle = ({ title }: { title: string }) => <S.HeaderTitle>{title}</S.HeaderTitle>;

const Header = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const navigate = useNavigate();

  const handleClickButton =
    pathName === ROUTE_PATHS.root ? () => navigate(-1) : () => navigate(ROUTE_PATHS.root);

  return (
    <Drawer>
      <S.HeaderLayout>
        <BackIcon />
        <Drawer.Trigger>
          <Hamburger />
        </Drawer.Trigger>
      </S.HeaderLayout>

      <Drawer.Header>
        <S.DrawHeaderContainer>
          <Drawer.Trigger>
            <DoubleRightArrow />
          </Drawer.Trigger>
        </S.DrawHeaderContainer>
      </Drawer.Header>
      <Drawer.Content>
        <S.MenuList>
          {headerMenus.map((menu, index) => (
            <S.MenuItem key={index}>{menu}</S.MenuItem>
          ))}
        </S.MenuList>
      </Drawer.Content>
    </Drawer>
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
