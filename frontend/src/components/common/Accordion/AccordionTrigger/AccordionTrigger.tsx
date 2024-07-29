import { useAccordionItemContext } from "@components/common/Accordion/AccordionItem/accordionItemContext";
import { useAccordionContext } from "@components/common/Accordion/AccordionRoot/accordionContext";

import { DownArrow, RecycleBin, UpArrow } from "@assets/svg";

import * as S from "./AccordionTrigger.styled";

interface AccordionTriggerProps extends React.PropsWithChildren {
  onDeleteItem: () => void;
}

const AccordionTrigger = ({ children, onDeleteItem }: AccordionTriggerProps) => {
  const { value, handleToggleAccordion } = useAccordionContext();

  const label = useAccordionItemContext();

  const isExpanded = value.has(label);

  return (
    <S.Layout $isExpanded={isExpanded} onClick={() => handleToggleAccordion(label)}>
      <S.TitleContainer>
        <button>{isExpanded ? <UpArrow /> : <DownArrow />}</button>
        <S.Title>{children}</S.Title>
      </S.TitleContainer>
      <button onClick={onDeleteItem} title="delete button">
        <RecycleBin />
      </button>
    </S.Layout>
  );
};

export default AccordionTrigger;
