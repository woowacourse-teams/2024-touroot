import { useAccordionItemContext } from "@components/common/Accordion/AccordionItem/accordionItemContext";
import { useAccordionContext } from "@components/common/Accordion/AccordionRoot/accordionContext";

import * as S from "./AccordionContent.styled";

const AccordionContent = ({ children }: React.PropsWithChildren) => {
  const { value } = useAccordionContext();
  const label = useAccordionItemContext();
  const isExpanded = value.has(label);

  return (
    <S.Layout $isExpanded={isExpanded}>
      <S.Container>
        <S.Inner $isExpanded={isExpanded}>{children}</S.Inner>
      </S.Container>
    </S.Layout>
  );
};

export default AccordionContent;
