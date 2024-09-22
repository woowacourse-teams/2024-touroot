import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ROUTE_PATHS_MAP } from "@constants/route";

type PreviousPages = {
  [key: string]: string;
};

const usePreviousPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPages, setPreviousPages] = useState<PreviousPages>({});

  useEffect(() => {
    setPreviousPages((prev) => ({
      ...prev,
      [location.pathname]: document.referrer,
    }));
  }, [location]);

  const goBack = () => {
    const previousPage = previousPages[location.pathname];
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
