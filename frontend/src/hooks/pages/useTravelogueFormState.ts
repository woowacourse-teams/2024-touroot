import { TravelTransformDays } from "@type/domain/travelTransform";

import useTravelogueThumbnail from "@components/pages/travelogueRegister/hooks/useTravelogueThumbnail";
import useTravelogueTitle from "@components/pages/travelogueRegister/hooks/useTravelogueTitle";

import useTravelogueDays from "@hooks/pages/useTravelogueDays";
import useMultiSelectionTag from "@hooks/useMultiSelectionTag";

const useTravelogueFormState = (transformDays: TravelTransformDays[]) => {
  const { title, onChangeTitle } = useTravelogueTitle(transformDays);
  const { thumbnail, onChangeThumbnail, onResetThumbnail } = useTravelogueThumbnail();
  const {
    selectedTagIDs,
    handleClickTag: onClickTag,
    sortedTags,
    animationKey,
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
      onClickTag,
      onAddDay,
      onDeleteDay,
      onAddPlace,
      onDeletePlace,
      onChangeImageUrls,
      onDeleteImageUrls,
      onChangePlaceDescription,
    },
  };
};

export default useTravelogueFormState;
