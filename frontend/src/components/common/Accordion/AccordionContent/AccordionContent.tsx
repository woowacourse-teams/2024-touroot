import { useAccordionItemContext } from "@components/common/Accordion/AccordionItem/accordionItemContext";
import { useAccordionContext } from "@components/common/Accordion/AccordionRoot/accordionContext";

import * as S from "./AccordionContent.styled";

const AccordionContent = ({ children }: React.PropsWithChildren) => {
  const { value } = useAccordionContext();
  const label = useAccordionItemContext();
  const isClosed = !value.has(label);

  return (
    <S.Layout $isClosed={isClosed}>
      <S.Container>
        <S.Inner $isClosed={isClosed}>{children}</S.Inner>
      </S.Container>
    </S.Layout>
  );
};

export default AccordionContent;
