import { useLocation, useNavigate } from "react-router-dom";

import useUser from "@hooks/useUser";

import { ROUTE_PATHS_MAP } from "@constants/route";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

import { DoubleRightArrow } from "@assets/svg";

import Drawer from "../Drawer/Drawer";
import IconButton from "../IconButton/IconButton";
import * as S from "./Header.styled";

interface HeaderProps {
  isLogoUsed?: boolean;
  rightContent: React.ReactNode;
  isRightContentFull?: boolean;
  isHamburgerUsed?: boolean;
}

const Header = ({
  isLogoUsed = false,
  rightContent,
  isRightContentFull = false,
  isHamburgerUsed = false,
}: HeaderProps) => {
  const { user, saveUser } = useUser();
  const location = useLocation();
  const pathName = location.pathname;

  const navigate = useNavigate();

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

  return (
    <Drawer>
      <S.HeaderLayout>
        <S.LeftWrapper>
          <IconButton
            color={isLogoUsed ? theme.colors.primary : PRIMITIVE_COLORS.black}
            iconType={isLogoUsed ? "korean-logo" : "back-icon"}
            onClick={
              isLogoUsed
                ? () => navigate(ROUTE_PATHS_MAP.root)
                : () => navigate(ROUTE_PATHS_MAP.back)
            }
          />
        </S.LeftWrapper>

        <S.RightContainer $isRightContentFull={isRightContentFull}>
          {rightContent}
          {isHamburgerUsed && (
            <Drawer.Trigger>
              <IconButton iconType="hamburger" />
            </Drawer.Trigger>
          )}
        </S.RightContainer>
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
