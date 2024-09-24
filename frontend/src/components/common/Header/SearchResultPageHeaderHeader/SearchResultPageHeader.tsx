import { useNavigate } from "react-router-dom";

import IconButton from "@components/common/IconButton/IconButton";

import { ROUTE_PATHS_MAP } from "@constants/route";

import Header from "../Header";

const SearchResultPageHeader = () => {
  const navigation = useNavigate();

  return (
    <Header
      rightContent={
        <IconButton
          iconType="search-icon"
          size="18"
          onClick={() => navigation(ROUTE_PATHS_MAP.searchMain)}
        />
      }
      isHamburgerUsed
    />
  );
};

export default SearchResultPageHeader;