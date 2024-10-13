import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetTravelogue } from "@queries/useGetTravelogue";

import useAuthorCheck from "@components/pages/travelogueEdit/hooks/useAuthorCheck";

import useTravelogueFormState from "@hooks/pages/useTravelogueFormState/useTravelogueFormState";

type UseTravelogueFormStateHandler = ReturnType<typeof useTravelogueFormState>["handler"];

type UseTravelogueInitializationReturn = Pick<
  UseTravelogueFormStateHandler,
  | "handleChangeTitle"
  | "handleInitializeThumbnail"
  | "handleChangeSelectedTagIDs"
  | "handleChangeTravelogueDays"
>;

const useTravelogueInitialization = ({
  handleChangeTitle,
  handleInitializeThumbnail,
  handleChangeSelectedTagIDs,
  handleChangeTravelogueDays,
}: UseTravelogueInitializationReturn) => {
  const { id = "" } = useParams();
  const { data: travelogueResponse } = useGetTravelogue(id);

  useEffect(() => {
    if (travelogueResponse) {
      handleChangeTitle(travelogueResponse.title);
      handleInitializeThumbnail(travelogueResponse.thumbnail);
      handleChangeSelectedTagIDs(travelogueResponse.tags.map((tag) => tag.id));
      handleChangeTravelogueDays(travelogueResponse.days);
    }
  }, [
    travelogueResponse,
    handleChangeTitle,
    handleInitializeThumbnail,
    handleChangeSelectedTagIDs,
    handleChangeTravelogueDays,
  ]);

  useAuthorCheck(travelogueResponse);
};

export default useTravelogueInitialization;
