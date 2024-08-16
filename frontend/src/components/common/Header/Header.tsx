import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import IconButton from "@components/common/IconButton/IconButton";

import useUser from "@hooks/useUser";

import { ROUTE_PATHS_MAP } from "@constants/route";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

import { DoubleRightArrow } from "@assets/svg";

import Drawer from "../Drawer/Drawer";
import Icon from "../Icon/Icon";
import { Input } from "../Input/Input.styled";
import * as S from "./Header.styled";

const Header = () => {
  const { user, saveUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  const encodedKeyword =
    location.pathname.split("/").length > 2 ? location.pathname.split("/").pop() : "";
  const receivedKeyword = encodedKeyword ? decodeURIComponent(encodedKeyword) : "";

  const [keyword, setKeyword] = useState(() => {
    return receivedKeyword === ":id" ? "" : receivedKeyword;
  });

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

    saveUser({ accessToken: "", memberId: 0 });
  };

  const handleClickSearchIcon = () => {
    navigate(ROUTE_PATHS_MAP.searchMain);
  };

  const handleClickMyPage = () => navigate(ROUTE_PATHS_MAP.my);

  const handleClickHome = () => navigate(ROUTE_PATHS_MAP.root);

  const handleClickSearchButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.length < 2) {
      alert("2글자 이상 검색해주세요.");
    } else {
      navigate(ROUTE_PATHS_MAP.search(keyword));
    }
  };

  const handleClickDeleteButton = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setKeyword("");
    document.querySelector("input")?.focus();
  };

  return (
    <Drawer>
      <S.HeaderLayout>
        <IconButton
          color={pathName === ROUTE_PATHS_MAP.root ? theme.colors.primary : PRIMITIVE_COLORS.black}
          onClick={handleClickButton}
          iconType={pathName === ROUTE_PATHS_MAP.root ? "korean-logo" : "back-icon"}
        />
        {!pathName.includes(ROUTE_PATHS_MAP.search().split("/")[1]) ? (
          <>
            {pathName === ROUTE_PATHS_MAP.login ? (
              <>
                <S.HeaderTitle>로그인</S.HeaderTitle>
                <S.HiddenDiv />
              </>
            ) : (
              <S.HeaderRightContainer>
                {pathName === ROUTE_PATHS_MAP.root ? (
                  <IconButton onClick={handleClickSearchIcon} iconType="search-icon" />
                ) : null}
                <Drawer.Trigger>
                  <IconButton iconType="hamburger" />
                </Drawer.Trigger>
              </S.HeaderRightContainer>
            )}
          </>
        ) : (
          <S.FormWrapper onSubmit={handleClickSearchButton}>
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              autoFocus
              placeholder="검색해주세요"
              css={css`
                height: 4rem;
              `}
            />
            <S.ButtonContainer>
              <S.DeleteButton
                title="delete keyword button"
                type="button"
                onClick={handleClickDeleteButton}
              >
                <Icon iconType="x-icon" size="8" />
              </S.DeleteButton>
              <button title="search button" type="submit">
                <Icon iconType="search-icon" size="18" />
              </button>
            </S.ButtonContainer>
          </S.FormWrapper>
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
