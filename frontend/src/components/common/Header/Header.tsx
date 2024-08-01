import { useLocation, useNavigate } from "react-router-dom";

import IconButton from "@components/common/IconButton/IconButton";

import useUser from "@hooks/useUser";

import { ROUTE_PATHS } from "@constants/route";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

import { DoubleRightArrow } from "@assets/svg";

import Drawer from "../Drawer/Drawer";
import * as S from "./Header.styled";

const Header = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const navigate = useNavigate();

  const handleClickButton =
    pathName === ROUTE_PATHS.root || pathName === ROUTE_PATHS.login
      ? () => navigate(ROUTE_PATHS.root)
      : () => navigate(-1);

  const { user } = useUser();

  return (
    <Drawer>
      <S.HeaderLayout>
        <IconButton
          color={pathName === ROUTE_PATHS.root ? theme.colors.primary : PRIMITIVE_COLORS.black}
          onClick={handleClickButton}
          iconType={pathName === ROUTE_PATHS.root ? "korean-logo" : "back-icon"}
        />
        {pathName === ROUTE_PATHS.login ? (
          <>
            <S.HeaderTitle>로그인</S.HeaderTitle>
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
          <Drawer.Trigger>
            {/* TODO: 마이페이지 로직 필요함 */}
            <S.MenuItem>마이페이지</S.MenuItem>
          </Drawer.Trigger>
          <Drawer.Trigger>
            {user ? (
              //TODO: 로그아웃 로직 필요함
              <S.MenuItem>로그아웃</S.MenuItem>
            ) : (
              <S.MenuItem
                onClick={() => {
                  navigate(ROUTE_PATHS.login);
                }}
              >
                로그인
              </S.MenuItem>
            )}
          </Drawer.Trigger>
        </S.MenuList>
      </Drawer.Content>
    </Drawer>
  );
};

export default Header;
