import { useNavigate, useParams } from "react-router-dom";

import { TravelPlanPayload } from "@type/domain/travelPlan";

import { usePutTravelPlan } from "@queries/usePutTravelPlan";

import useLeadingDebounce from "@hooks/useLeadingDebounce";

import { DEBOUNCED_TIME } from "@constants/debouncedTime";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

const useTravelPlanEdit = (payload: TravelPlanPayload, handleCloseBottomSheet: () => void) => {
  const {
    mutate: mutateTravelPlanEdit,
    isPaused,
    isPending: isPuttingTravelPlanPending,
  } = usePutTravelPlan();

  const navigate = useNavigate();

  const { id = "" } = useParams();

  const handleEditTravelPlan = () => {
    mutateTravelPlanEdit(
      {
        travelPlan: payload,
        id: Number(id),
      },
      {
        onSuccess: () => {
          handleCloseBottomSheet();
          navigate(ROUTE_PATHS_MAP.travelPlan(id));
        },
      },
    );
  };

  const handleDebouncedEditTravelPlan = useLeadingDebounce(() => {
    if (isPaused) alert(ERROR_MESSAGE_MAP.network);
    handleEditTravelPlan();
  }, DEBOUNCED_TIME);

  return { handleDebouncedEditTravelPlan, isPuttingTravelPlanPending };
};

export default useTravelPlanEdit;
