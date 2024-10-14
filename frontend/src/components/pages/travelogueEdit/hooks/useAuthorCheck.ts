import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TravelogueResponse } from "@type/domain/travelogue";

import useUser from "@hooks/useUser";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

const useAuthorCheck = (data?: TravelogueResponse) => {
  const { user } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthor = data && data.authorId === user?.memberId;

    if (!isAuthor) {
      alert(ERROR_MESSAGE_MAP.api.travelogueEditOnlyWriter);
      navigate(ROUTE_PATHS_MAP.back);
    }
  }, [user, navigate, data]);
};

export default useAuthorCheck;
