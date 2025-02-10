import { useEffect, useState } from "react";

const useSearchPlaceHistory = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    window.history.pushState({ isPopupOpen: true }, "");
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    window.history.back();
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state.isPopupOpen) return setIsPopupOpen(true);
      setIsPopupOpen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isPopupOpen]);

  return { isPopupOpen, handleOpenPopup, handleClosePopup };
};

export default useSearchPlaceHistory;
