import { Outlet } from "react-router-dom";

import { Header } from "@components/common";

import * as S from "./AppLayout.styled";

const AppLayout = () => {
  return (
    <>
      <Header />
      <S.OutletContainer>
        <Outlet />
      </S.OutletContainer>
    </>
  );
};

export default AppLayout;
