import { useNavigate } from "react-router-dom";

import IconButton from "@components/common/IconButton/IconButton";

import { ROUTE_PATHS_MAP } from "@constants/route";

import Header from "../Header";

const DefaultHeader = () => {
  const navigation = useNavigate();
  return (
    <Header
      rightContent={
        <IconButton
          iconType="home-icon"
          size="20"
          onClick={() => navigation(ROUTE_PATHS_MAP.root)}
          aria-label="홈 이동"
        />
      }
      isHamburgerUsed
    />
  );
};

export default DefaultHeader;
