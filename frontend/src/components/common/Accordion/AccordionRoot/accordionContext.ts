import { createContext, useContext } from "react";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

interface AccordionContextConfig {
  value: Set<string>;
  handleToggleAccordion: (item: string) => void;
}

export const AccordionContext = createContext<AccordionContextConfig | null>(null);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(ERROR_MESSAGE_MAP.provider);
  }

  return context;
};
