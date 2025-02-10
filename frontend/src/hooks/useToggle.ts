import { useState } from "react";

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return [isOpen, handleOpen, handleClose, toggle] as const;
};

export default useToggle;
