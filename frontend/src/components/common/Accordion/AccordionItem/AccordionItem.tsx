import { AccordionItemContext } from "@components/common/Accordion/AccordionItem/accordionItemContext";

import * as S from "./AccordionItem.styled";

interface AccordionItemProps extends React.PropsWithChildren {
  value: string;
}

const AccordionItem = ({ value, children }: AccordionItemProps) => {
  return (
    <AccordionItemContext.Provider value={value}>
      <S.Layout>{children}</S.Layout>
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
