import { useLocation, useNavigate } from "react-router-dom";

import { ROUTE_PATHS_MAP } from "@constants/route";

const usePreviousPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = document.referrer;

  const goBack = () => {
    const currentPage = location.pathname;
    const isPreviousPageMy = previousPage?.includes(ROUTE_PATHS_MAP.my);
    const isCurrentPageLogin = currentPage.includes(ROUTE_PATHS_MAP.login);

    if (isPreviousPageMy && isCurrentPageLogin) {
      navigate(ROUTE_PATHS_MAP.root);
    } else {
      navigate(ROUTE_PATHS_MAP.back);
    }
  };

  return goBack;
};

export default usePreviousPage;
