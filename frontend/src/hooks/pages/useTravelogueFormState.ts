import { TravelTransformDays } from "@type/domain/travelTransform";

import useTravelogueThumbnail from "@components/pages/travelogueRegister/hooks/useTravelogueThumbnail";
import useTravelogueTitle from "@components/pages/travelogueRegister/hooks/useTravelogueTitle";

import useTravelogueDays from "@hooks/pages/useTravelogueDays";
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
