import { useLocation, useNavigate } from "react-router-dom";

import IconButton from "@components/common/IconButton/IconButton";

import useUser from "@hooks/useUser";

import { ROUTE_PATHS_MAP } from "@constants/route";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

import { DoubleRightArrow } from "@assets/svg";

import Drawer from "../Drawer/Drawer";
import * as S from "./Header.styled";

const Header = () => {
  const { user, saveUser } = useUser();
  const location = useLocation();
  const pathName = location.pathname;

  const navigate = useNavigate();

  const handleClickButton =
    pathName === ROUTE_PATHS_MAP.root || pathName === ROUTE_PATHS_MAP.login
      ? () => navigate(ROUTE_PATHS_MAP.root)
      : () => navigate(ROUTE_PATHS_MAP.back);

  const handleClickLogout = () => {
    if (
      pathName.includes(ROUTE_PATHS_MAP.travelPlan().split("/").shift()!) ||
      pathName.includes(ROUTE_PATHS_MAP.my)
    ) {
      navigate(ROUTE_PATHS_MAP.login);
    }

    saveUser({ accessToken: "", memberId: 0, refreshToken: "" });
  };

  const handleClickMyPage = () => navigate(ROUTE_PATHS_MAP.my);

  const handleClickHome = () => navigate(ROUTE_PATHS_MAP.root);

  return (
    <Drawer>
      <S.HeaderLayout>
        <IconButton
          color={pathName === ROUTE_PATHS_MAP.root ? theme.colors.primary : PRIMITIVE_COLORS.black}
          onClick={handleClickButton}
          iconType={pathName === ROUTE_PATHS_MAP.root ? "korean-logo" : "back-icon"}
        />
        {pathName === ROUTE_PATHS_MAP.login ? (
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
            <S.MenuItem onClick={handleClickHome}>홈</S.MenuItem>
          </Drawer.Trigger>
          <Drawer.Trigger>
            <S.MenuItem onClick={handleClickMyPage}>마이페이지</S.MenuItem>
          </Drawer.Trigger>
          <Drawer.Trigger>
            {user?.accessToken ? (
              <S.MenuItem onClick={handleClickLogout}>로그아웃</S.MenuItem>
            ) : (
              <S.MenuItem
                onClick={() => {
                  navigate(ROUTE_PATHS_MAP.login);
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
