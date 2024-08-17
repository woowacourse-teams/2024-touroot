import { Outlet, useLocation } from "react-router-dom";

import HomeHeader from "@components/common/Header/HomePageHeader/HomePageHeader";
import LogoHeader from "@components/common/Header/LogoHeader/LogoHeader";
import SearchHeader from "@components/common/Header/SearchHeader/SearchHeader";

import { ROUTE_PATHS_MAP } from "@constants/route";

import * as S from "./AppLayout.styled";

const AppLayout = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const encodedKeyword =
    location.pathname.split("/").length > 2 ? location.pathname.split("/").pop() : "";
  const receivedKeyword = encodedKeyword ? decodeURIComponent(encodedKeyword) : "";

  const getHeader = (pathName: string) => {
    if (pathName === ROUTE_PATHS_MAP.root) return <LogoHeader />;
    if (pathName === ROUTE_PATHS_MAP.searchMain) return <SearchHeader />;
    if (receivedKeyword && pathName.includes(ROUTE_PATHS_MAP.searchMain)) return <SearchHeader />;
    return <HomeHeader />;
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
