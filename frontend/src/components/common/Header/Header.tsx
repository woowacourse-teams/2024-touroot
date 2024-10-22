import { useLocation, useNavigate } from "react-router-dom";

import usePreviousPage from "@hooks/usePreviousPage";
import useUser from "@hooks/useUser";

import { ROUTE_PATHS_MAP } from "@constants/route";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

import Drawer from "../Drawer/Drawer";
import FocusTrap from "../FocusTrap";
import Icon from "../Icon/Icon";
import IconButton from "../IconButton/IconButton";
import Text from "../Text/Text";
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
  const goBack = usePreviousPage();

  return (
    <Drawer>
      <S.HeaderLayout>
        <S.LeftWrapper>
          <IconButton
            aria-label="홈 이동"
            color={isLogoUsed ? theme.colors.primary : PRIMITIVE_COLORS.black}
            iconType={isLogoUsed ? "korean-logo" : "back-icon"}
            onClick={isLogoUsed ? () => navigate(ROUTE_PATHS_MAP.root) : () => goBack()}
          />
        </S.LeftWrapper>

        <S.RightContainer $isRightContentFull={isRightContentFull}>
          {rightContent}
          {isHamburgerUsed && (
            <Drawer.Trigger>
              <Icon iconType="hamburger" aria-label="사용자 메뉴" size="24" />
            </Drawer.Trigger>
          )}
        </S.RightContainer>
      </S.HeaderLayout>

      <Drawer.Header>
        <Drawer.Trigger>
          <Icon iconType="double-right-arrow" aria-label="사용제 메뉴 닫기" size="24" />
        </Drawer.Trigger>
      </Drawer.Header>
      <Drawer.Content>
        <FocusTrap>
          <S.MenuList>
            <Drawer.Trigger onClick={handleClickMyPage}>
              <Text textType="bodyBold">마이페이지</Text>
            </Drawer.Trigger>
            {user?.accessToken ? (
              <Drawer.Trigger onClick={handleClickLogout}>
                <Text textType="bodyBold">로그아웃</Text>
              </Drawer.Trigger>
            ) : (
              <Drawer.Trigger
                onClick={() => {
                  navigate(ROUTE_PATHS_MAP.login);
                }}
              >
                <Text textType="bodyBold">로그인</Text>
              </Drawer.Trigger>
            )}
          </S.MenuList>
        </FocusTrap>
      </Drawer.Content>
    </Drawer>
  );
};

export default Header;
