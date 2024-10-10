import { TravelTransformDays } from "@type/domain/travelTransform";

import useTravelogueDays from "@hooks/pages/useTravelogueFormState/useTravelogueDays";
import useTravelogueThumbnail from "@hooks/pages/useTravelogueFormState/useTravelogueThumbnail";
import useTravelogueTitle from "@hooks/pages/useTravelogueFormState/useTravelogueTitle";
import useMultiSelectionTag from "@hooks/useMultiSelectionTag";

const useTravelogueFormState = (transformDays: TravelTransformDays[]) => {
  const { title, onChangeTitle } = useTravelogueTitle(transformDays);
  const { thumbnail, onChangeThumbnail, onResetThumbnail, onInitializeThumbnail } =
    useTravelogueThumbnail();
  const {
    selectedTagIDs,
    sortedTags,
    animationKey,
    handleClickTag: onClickTag,
    onChangeSelectedTagIDs,
  } = useMultiSelectionTag();
  const {
    travelogueDays,
    onAddDay,
    onAddPlace,
    onDeleteDay,
    onDeletePlace,
    onChangeImageUrls,
    onChangePlaceDescription,
    onDeleteImageUrls,
    onChangeTravelogueDays,
  } = useTravelogueDays(transformDays);

  return {
    state: {
      title,
      thumbnail,
      travelogueDays,
      selectedTagIDs,
      sortedTags,
      animationKey,
    },
    handler: {
      onChangeTitle,
      onChangeThumbnail,
      onResetThumbnail,
      onInitializeThumbnail,
      onClickTag,
      onChangeTravelogueDays,
      onAddDay,
      onDeleteDay,
      onAddPlace,
      onDeletePlace,
      onChangeImageUrls,
      onDeleteImageUrls,
      onChangePlaceDescription,
      onChangeSelectedTagIDs,
    },
  };
};

export default useTravelogueFormState;
