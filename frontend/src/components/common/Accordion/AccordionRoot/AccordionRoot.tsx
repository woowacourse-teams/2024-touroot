import { useCallback, useState } from "react";

import { AccordionContext } from "@components/common/Accordion/AccordionRoot/accordionContext";

import * as S from "./AccordionRoot.styled";

const AccordionRoot = ({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const [item, setItem] = useState<Set<string>>(new Set());

  const handleToggleAccordion = useCallback(
    (value: string) => {
      const newItem = new Set(item);

      if (item.has(value)) {
        newItem.delete(value);
        setItem(newItem);
      } else {
        newItem.add(value);
        setItem(newItem);
      }
    },
    [item],
  );

  return (
    <AccordionContext.Provider value={{ value: item, handleToggleAccordion }}>
      <S.Layout {...props}>{children}</S.Layout>
    </AccordionContext.Provider>
  );
};

export default AccordionRoot;
