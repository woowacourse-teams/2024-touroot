import { AccordionItemContext } from "@components/common/Accordion/AccordionItem/accordionItemContext";

import { CYPRESS_DATA_MAP } from "@constants/cypress";

import * as S from "./AccordionItem.styled";

interface AccordionItemProps extends React.PropsWithChildren {
  value: string;
}

const AccordionItem = ({ value, children }: AccordionItemProps) => {
  return (
    <AccordionItemContext.Provider value={value}>
      <S.Layout data-cy={CYPRESS_DATA_MAP.accordion.item}>{children}</S.Layout>
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
