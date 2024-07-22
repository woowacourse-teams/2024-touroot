import { createContext, useContext } from "react";

export const AccordionItemContext = createContext<string>("");

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("Provider 바깥에 존재합니다!");
  }

  return context;
};
