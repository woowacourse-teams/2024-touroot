import { useNavigate } from "react-router-dom";

import { TravelPlanPayload } from "@type/domain/travelPlan";

import { usePostTravelPlan } from "@queries/usePostTravelPlan";

import useLeadingDebounce from "@hooks/useLeadingDebounce";

import { DEBOUNCED_TIME } from "@constants/debouncedTime";
import { ROUTE_PATHS_MAP } from "@constants/route";

import { extractLastPath } from "@utils/extractId";

const useTravelPlanRegister = (payload: TravelPlanPayload, handleBottomSheetClose: () => void) => {
  const { mutate: mutateTravelPlanRegister, isPending: isPostingTravelPlanPending } =
    usePostTravelPlan();

  const navigate = useNavigate();

  const handleRegisterTravelPlan = () => {
    mutateTravelPlanRegister(payload, {
      onSuccess: ({ headers: { location } }) => {
        const id = extractLastPath(location);

        handleBottomSheetClose();
        navigate(ROUTE_PATHS_MAP.travelPlan(id));
      },
    });
  };

  const handleDebouncedRegisterBottomSheet = useLeadingDebounce(
    () => handleRegisterTravelPlan(),
    DEBOUNCED_TIME,
  );

  return { handleDebouncedRegisterBottomSheet, isPostingTravelPlanPending };
};

export default useTravelPlanRegister;
