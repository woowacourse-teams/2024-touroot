import { createContext, useContext } from "react";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

export const AccordionItemContext = createContext<string>("");

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(ERROR_MESSAGE_MAP.provider);
  }

  return context;
};
