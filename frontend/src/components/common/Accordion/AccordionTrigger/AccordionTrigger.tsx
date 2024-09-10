import { useAccordionItemContext } from "@components/common/Accordion/AccordionItem/accordionItemContext";
import { useAccordionContext } from "@components/common/Accordion/AccordionRoot/accordionContext";
import IconButton from "@components/common/IconButton/IconButton";

import { DownArrow, UpArrow } from "@assets/svg";

import * as S from "./AccordionTrigger.styled";

interface AccordionTriggerProps extends React.PropsWithChildren {
  onDeleteItem: () => void;
}

const AccordionTrigger = ({ children, onDeleteItem }: AccordionTriggerProps) => {
  const { value, handleToggleAccordion } = useAccordionContext();

  const label = useAccordionItemContext();

  const isClosed = !value.has(label);

  return (
    <S.Layout onClick={() => handleToggleAccordion(label)}>
      <S.TitleContainer>
        <button>{isClosed ? <UpArrow /> : <DownArrow />}</button>
        <S.Title>{children}</S.Title>
      </S.TitleContainer>
      <IconButton size="16" iconType="recycle-bin" onClick={onDeleteItem} title="delete button" />
    </S.Layout>
  );
};

export default AccordionTrigger;
