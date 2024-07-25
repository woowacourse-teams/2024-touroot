import { useLocation, useNavigate } from "react-router-dom";

import IconButton from "@components/common/IconButton/IconButton";

import { ROUTE_PATHS } from "@constants/route";

import theme from "@styles/theme";

import { DoubleRightArrow } from "@assets/svg";

import Drawer from "../Drawer/Drawer";
import * as S from "./Header.styled";

const headerMenus = ["마이페이지", "로그인"];

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
        <IconButton
          color={theme.colors.primary}
          onClick={handleClickButton}
          iconType={pathName === ROUTE_PATHS.root ? "korean-logo" : "back-icon"}
        />
        {pathName === ROUTE_PATHS.login ? (
          <>
            <HeaderTitle title="로그인" />
            <S.HiddenDiv />
          </>
        ) : (
          <Drawer.Trigger>
            <IconButton iconType={"hamburger"} />
          </Drawer.Trigger>
        )}
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
            <S.MenuItem key={`${menu}-${index}`}>{menu}</S.MenuItem>
          ))}
        </S.MenuList>
      </Drawer.Content>
    </Drawer>
  );
};

export default Header;
