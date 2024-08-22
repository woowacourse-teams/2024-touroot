import { Outlet, useLocation } from "react-router-dom";

import { DefaultHeader, HomePageHeader, SearchHeader } from "@components/common";

import { ROUTE_PATHS_MAP } from "@constants/route";

import { extractLastPath } from "@utils/extractId";

import * as S from "./AppLayout.styled";

const MIN_KEYWORD_LENGTH = 2;

const AppLayout = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const encodedKeyword =
    location.pathname.split("/").length > MIN_KEYWORD_LENGTH ? extractLastPath(pathName) : "";
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
