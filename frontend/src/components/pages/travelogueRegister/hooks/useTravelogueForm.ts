import { TravelTransformDays } from "@type/domain/travelTransform";

import useTravelogueDays from "@components/pages/travelogueRegister/hooks/useTravelogueDays";
import useTravelogueRegister from "@components/pages/travelogueRegister/hooks/useTravelogueRegister";
import useTravelogueThumbnail from "@components/pages/travelogueRegister/hooks/useTravelogueThumbnail";
import useTravelogueTitle from "@components/pages/travelogueRegister/hooks/useTravelogueTitle";

import useMultiSelectionTag from "@hooks/useMultiSelectionTag";

const useTravelogueForm = (
  transformDays: TravelTransformDays[],
  handleCloseBottomSheet: () => void,
) => {
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

  const payload = {
    title,
    thumbnail: thumbnail || (process.env.DEFAULT_THUMBNAIL_IMAGE ?? ""),
    tags: selectedTagIDs,
    days: travelogueDays,
  };

  const { onSubmitTravelogue, isPostingTraveloguePending } = useTravelogueRegister(
    payload,
    handleCloseBottomSheet,
  );

  return {
    state: {
      title,
      thumbnail,
      travelogueDays,
      selectedTagIDs,
      sortedTags,
      animationKey,
      isPostingTraveloguePending,
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
      onSubmitTravelogue,
    },
  };
};

export default useTravelogueForm;
