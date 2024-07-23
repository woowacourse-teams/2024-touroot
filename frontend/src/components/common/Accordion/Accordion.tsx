import AccordionContent from "./AccordionContent/AccordionContent";
import AccordionItem from "./AccordionItem/AccordionItem";
import AccordionRoot from "./AccordionRoot/AccordionRoot";
import AccordionTrigger from "./AccordionTrigger/AccordionTrigger";

const Accordion = ({ children }: React.PropsWithChildren) => {
  return <>{children}</>;
};

export default Accordion;

Accordion.Root = AccordionRoot;
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
