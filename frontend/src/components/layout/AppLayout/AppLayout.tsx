import { Outlet, useLocation } from "react-router-dom";

import DefaultHeader from "@components/common/Header/DefaultHeader/DefaultHeader";
import HomePageHeader from "@components/common/Header/HomePageHeader/HomePageHeader";
import SearchHeader from "@components/common/Header/SearchHeader/SearchHeader";

import { ROUTE_PATHS_MAP } from "@constants/route";

import * as S from "./AppLayout.styled";

const MIN_KEYWORD_LENGTH = 2;

const AppLayout = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const encodedKeyword =
    location.pathname.split("/").length > MIN_KEYWORD_LENGTH
      ? location.pathname.split("/").pop()
      : "";
  const receivedKeyword = encodedKeyword ? decodeURIComponent(encodedKeyword) : "";

  const getHeader = (pathName: string) => {
    if (pathName === ROUTE_PATHS_MAP.root) return <HomePageHeader />;
    if (pathName === ROUTE_PATHS_MAP.searchMain) return <SearchHeader />;
    if (receivedKeyword && pathName.includes(ROUTE_PATHS_MAP.searchMain)) return <SearchHeader />;
    return <DefaultHeader />;
  };

  return (
    <>
      {getHeader(pathName)}
      <S.OutletContainer>
        <Outlet />
      </S.OutletContainer>
    </>
  );
};

export default AppLayout;
