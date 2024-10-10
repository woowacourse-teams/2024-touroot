import { useNavigate, useParams } from "react-router-dom";

import type { TraveloguePayload } from "@type/domain/travelogue";

import { usePutTravelogue } from "@queries/usePutTravelogue";

import useLeadingDebounce from "@hooks/useLeadingDebounce";

import { DEBOUNCED_TIME } from "@constants/debouncedTime";
import { ROUTE_PATHS_MAP } from "@constants/route";

const useTravelogueEdit = (payload: TraveloguePayload, handleCloseBottomSheet: () => void) => {
  const { mutate: mutateTravelogueEdit, isPending: isPuttingTraveloguePending } =
    usePutTravelogue();

  const { id = "" } = useParams();

  const navigate = useNavigate();

  const handleEditTravelogue = () => {
    mutateTravelogueEdit(
      { travelogue: payload, id: Number(id) },
      {
        onSuccess: () => {
          handleCloseBottomSheet();
          navigate(ROUTE_PATHS_MAP.travelogue(id));
        },
      },
    );
  };

  const onEditTravelogue = useLeadingDebounce(handleEditTravelogue, DEBOUNCED_TIME);

  return { isPuttingTraveloguePending, onEditTravelogue };
};

export default useTravelogueEdit;
