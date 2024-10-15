import { TravelTransformDays } from "@type/domain/travelTransform";

import useTravelogueDays from "@hooks/pages/useTravelogueFormState/useTravelogueDays";
import useTravelogueThumbnail from "@hooks/pages/useTravelogueFormState/useTravelogueThumbnail";
import useTravelogueTitle from "@hooks/pages/useTravelogueFormState/useTravelogueTitle";
import useMultiSelectionTag from "@hooks/useMultiSelectionTag";

const useTravelogueFormState = (transformDays: TravelTransformDays[]) => {
  const { title, titleErrorMessage, isEnabledTravelogueTitle, handleChangeTitle } =
    useTravelogueTitle(transformDays);
  const { thumbnail, handleChangeThumbnail, handleResetThumbnail, handleInitializeThumbnail } =
    useTravelogueThumbnail();
  const { selectedTagIDs, sortedTags, animationKey, handleClickTag, handleChangeSelectedTagIDs } =
    useMultiSelectionTag();
  const {
    travelogueDays,
    travelogueDaysErrorMessage,
    isEnabledTravelogueDays,
    handleAddDay,
    handleAddPlace,
    handleDeleteDay,
    handleDeletePlace,
    handleChangeImageUrls,
    handleChangePlaceDescription,
    handleDeleteImageUrls,
    handleChangeTravelogueDays,
  } = useTravelogueDays(transformDays);

  const isEnabledForm = isEnabledTravelogueTitle && isEnabledTravelogueDays;

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
    errorMessages: {
      titleErrorMessage,
      travelogueDaysErrorMessage,
    },
    isEnabledForm,
  };
};

export default useTravelogueFormState;
