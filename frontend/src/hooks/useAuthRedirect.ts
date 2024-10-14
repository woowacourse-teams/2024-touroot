import { useEffect } from "react";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import useUser from "@hooks/useUser";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const { saveTransformDetail } = useTravelTransformDetailContext();

  const { user } = useUser();

  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.accessToken) {
      alert(ERROR_MESSAGE_MAP.api.login);
      navigate(ROUTE_PATHS_MAP.login);
    }

    return () => {
      saveTransformDetail(null);
    };
  }, [user?.accessToken, navigate, saveTransformDetail]);
};

export default useAuthRedirect;
