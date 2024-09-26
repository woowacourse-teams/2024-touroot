import { useState } from "react";

import { SortingOption, TravelPeriodOption } from "@type/domain/travelogue";

import { STORAGE_KEYS_MAP } from "@constants/storage";

const useSingleSelectionTag = () => {
  const [isSortingModalOpen, setIsSortingModalOpen] = useState(false);
  const [selectedSortingOption, setSelectedSortingOption] = useState<SortingOption>(
    (localStorage.getItem(STORAGE_KEYS_MAP.sort) as SortingOption) ?? "likeCount",
  );

  const [isTravelPeriodModalOpen, setIsTravelPeriodModalOpen] = useState(false);
  const [selectedTravelPeriodOption, setSelectedTravelPeriodOption] = useState<TravelPeriodOption>(
    (localStorage.getItem(STORAGE_KEYS_MAP.travelPeriod) as TravelPeriodOption) ?? "",
  );

  const handleOpenSortingModal = () => {
    setIsSortingModalOpen(true);
  };

  const handleCloseSortingModal = () => {
    setIsSortingModalOpen(false);
  };

  const handleClickSortingOption = (option: SortingOption) => {
    setSelectedSortingOption(option);
    localStorage.setItem(STORAGE_KEYS_MAP.sort, option);
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
    localStorage.setItem(STORAGE_KEYS_MAP.travelPeriod, option);
    handleCloseTravelPeriodModal();
  };

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
  };
};

export default useSingleSelectionTag;
