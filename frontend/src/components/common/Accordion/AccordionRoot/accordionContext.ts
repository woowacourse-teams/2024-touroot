import { createContext, useContext } from "react";

interface AccordionContextConfig {
  value: Set<string>;
  handleToggleAccordion: (item: string) => void;
}

export const AccordionContext = createContext<AccordionContextConfig | null>(null);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Provider 바깥에 존재합니다!");
  }

  return context;
};
