import { useNavigate } from "react-router-dom";

import { TraveloguePayload } from "@type/domain/travelogue";

import { usePostTravelogue } from "@queries/usePostTravelogue";

import useLeadingDebounce from "@hooks/useLeadingDebounce";

import { DEBOUNCED_TIME } from "@constants/debouncedTime";
import { ROUTE_PATHS_MAP } from "@constants/route";

import { extractLastPath } from "@utils/extractId";

const useTravelogueRegister = (
  traveloguePayload: TraveloguePayload,
  handleCloseBottomSheet: () => void,
) => {
  const navigate = useNavigate();

  const { mutate: mutateSubmitTravelogue, isPending: isPostingTraveloguePending } =
    usePostTravelogue();

  const handleSubmitTravelogue = () => {
    mutateSubmitTravelogue(traveloguePayload, {
      onSuccess: ({ headers: { location } }) => {
        const id = extractLastPath(location);

        handleCloseBottomSheet();
        navigate(ROUTE_PATHS_MAP.travelogue(id));
      },
    });
  };

  const onSubmitTravelogue = useLeadingDebounce(handleSubmitTravelogue, DEBOUNCED_TIME);

  return { onSubmitTravelogue, isPostingTraveloguePending };
};

export default useTravelogueRegister;
