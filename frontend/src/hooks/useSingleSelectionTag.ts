import { useCallback, useState } from "react";

import { SortingOption, TravelPeriodOption } from "@type/domain/travelogue";

const useSingleSelectionTag = (sortKey: string, travelPeriodKey: string) => {
  const [isSortingModalOpen, setIsSortingModalOpen] = useState(false);
  const [selectedSortingOption, setSelectedSortingOption] = useState<SortingOption>(
    (localStorage.getItem(sortKey) as SortingOption) ?? "likeCount",
  );

  const [isTravelPeriodModalOpen, setIsTravelPeriodModalOpen] = useState(false);
  const [selectedTravelPeriodOption, setSelectedTravelPeriodOption] = useState<TravelPeriodOption>(
    (localStorage.getItem(travelPeriodKey) as TravelPeriodOption) ?? "",
  );

  const [singleSelectionAnimationKey, setSingleSelectionAnimationKey] = useState(0);

  const handleOpenSortingModal = () => {
    setIsSortingModalOpen(true);
  };

  const handleCloseSortingModal = () => {
    setIsSortingModalOpen(false);
  };

  const handleClickSortingOption = (option: SortingOption) => {
    setSelectedSortingOption(option);
    localStorage.setItem(sortKey, option);
    window.scrollTo({ top: 0 });
    handleCloseSortingModal();
  };

  const handleOpenTravelPeriodModal = () => {
    setIsTravelPeriodModalOpen(true);
  };

  const handleCloseTravelPeriodModal = () => {
    setIsTravelPeriodModalOpen(false);
  };

  const handleClickTravelPeriodOption = (option: TravelPeriodOption) => {
    setSelectedTravelPeriodOption(option);
    localStorage.setItem(travelPeriodKey, option);
    window.scrollTo({ top: 0 });
    handleCloseTravelPeriodModal();
  };

  const resetSingleSelectionTags = () => {
    setSelectedSortingOption("likeCount");
    localStorage.setItem(sortKey, "likeCount");
    setSelectedTravelPeriodOption("");
    localStorage.setItem(travelPeriodKey, "");
  };

  const increaseSingleSelectionAnimationKey = useCallback(() => {
    setSingleSelectionAnimationKey((prev) => prev + 1);
  }, [setSingleSelectionAnimationKey]);

  return {
    sorting: {
      isModalOpen: isSortingModalOpen,
      selectedOption: selectedSortingOption,
      handleOpenModal: handleOpenSortingModal,
      handleCloseModal: handleCloseSortingModal,
      handleClickOption: handleClickSortingOption,
    },
    travelPeriod: {
      isModalOpen: isTravelPeriodModalOpen,
      selectedOption: selectedTravelPeriodOption,
      handleOpenModal: handleOpenTravelPeriodModal,
      handleCloseModal: handleCloseTravelPeriodModal,
      handleClickOption: handleClickTravelPeriodOption,
    },
    resetSingleSelectionTags,
    singleSelectionAnimationKey,
    increaseSingleSelectionAnimationKey,
  };
};

export default useSingleSelectionTag;
