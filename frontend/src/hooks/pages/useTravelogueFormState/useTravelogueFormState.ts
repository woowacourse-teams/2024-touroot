import { TravelTransformDays } from "@type/domain/travelTransform";

import useTravelogueDays from "@hooks/pages/useTravelogueFormState/useTravelogueDays";
import useTravelogueThumbnail from "@hooks/pages/useTravelogueFormState/useTravelogueThumbnail";
import useTravelogueTitle from "@hooks/pages/useTravelogueFormState/useTravelogueTitle";
import useMultiSelectionTag from "@hooks/useMultiSelectionTag";

const useTravelogueFormState = (transformDays: TravelTransformDays[]) => {
  const { title, handleChangeTitle } = useTravelogueTitle(transformDays);
  const { thumbnail, handleChangeThumbnail, handleResetThumbnail, handleInitializeThumbnail } =
    useTravelogueThumbnail();
  const {
    selectedTagIDs,
    sortedTags,
    multiSelectionTagAnimationKey,
    handleClickTag,
    handleChangeSelectedTagIDs,
  } = useMultiSelectionTag();
  const {
    travelogueDays,
    handleAddDay,
    handleAddPlace,
    handleDeleteDay,
    handleDeletePlace,
    handleChangeImageUrls,
    handleChangePlaceDescription,
    handleDeleteImageUrls,
    handleChangeTravelogueDays,
  } = useTravelogueDays(transformDays);

  return {
    state: {
      title,
      thumbnail,
      travelogueDays,
      selectedTagIDs,
      sortedTags,
      multiSelectionTagAnimationKey,
    },
    handler: {
      handleChangeTitle,
      handleChangeThumbnail,
      handleResetThumbnail,
      handleInitializeThumbnail,
      handleClickTag,
      handleChangeTravelogueDays,
      handleAddDay,
      handleDeleteDay,
      handleAddPlace,
      handleDeletePlace,
      handleChangeImageUrls,
      handleDeleteImageUrls,
      handleChangePlaceDescription,
      handleChangeSelectedTagIDs,
    },
  };
};

export default useTravelogueFormState;
