import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetTravelogue } from "@queries/useGetTravelogue";

import useAuthorCheck from "@components/pages/travelogueEdit/hooks/useAuthorCheck";

import useTravelogueFormState from "@hooks/pages/useTravelogueFormState";

type UseTravelogueFormStateHandler = ReturnType<typeof useTravelogueFormState>["handler"];

type UseTravelogueInitializationReturn = Pick<
  UseTravelogueFormStateHandler,
  "onChangeTitle" | "onInitializeThumbnail" | "onChangeSelectedTagIDs" | "onChangeTravelogueDays"
>;

const useTravelogueInitialization = ({
  onChangeTitle,
  onInitializeThumbnail,
  onChangeSelectedTagIDs,
  onChangeTravelogueDays,
}: UseTravelogueInitializationReturn) => {
  const { id = "" } = useParams();
  const { data: travelogueResponse } = useGetTravelogue(id);

  useEffect(() => {
    if (travelogueResponse) {
      onChangeTitle(travelogueResponse.title);
      onInitializeThumbnail(travelogueResponse.thumbnail);
      onChangeSelectedTagIDs(travelogueResponse.tags.map((tag) => tag.id));
      onChangeTravelogueDays(travelogueResponse.days);
    }
  }, [
    travelogueResponse,
    onChangeTitle,
    onInitializeThumbnail,
    onChangeSelectedTagIDs,
    onChangeTravelogueDays,
  ]);

  useAuthorCheck(travelogueResponse);
};

export default useTravelogueInitialization;
