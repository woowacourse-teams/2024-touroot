import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

import { useDragScroll } from "@hooks/useDragScroll";

import { STORAGE_KEYS_MAP } from "@constants/storage";

import * as S from "./Tab.styled";
import { FIRST_TAB_INDEX } from "./constants";

interface TabProps extends React.PropsWithChildren<ComponentPropsWithoutRef<"ul">> {
  storageKey?: string;
  tabContent: (selectedIndex: number) => JSX.Element;
  labels: string[];
}

const Tab = ({
  storageKey = STORAGE_KEYS_MAP.selectedTabIndex,
  labels,
  tabContent,
  ...props
}: TabProps) => {
  const [selectedIndex, setSelectedIndex] = useState(() =>
    parseInt(JSON.parse(localStorage.getItem(storageKey) ?? FIRST_TAB_INDEX.toString())),
  );

  useEffect(() => {
    return () => {
      localStorage.setItem(storageKey, FIRST_TAB_INDEX.toString());
    };
  }, []);

  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { scrollRef, onMouseDown, onMouseMove, onMouseUp } = useDragScroll();

  const handleClickTab = (index: number) => {
    setSelectedIndex(index);
    localStorage.setItem(storageKey, JSON.stringify(index));
  };

  return (
    <>
      <S.TabList
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseUp}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        {...props}
      >
        {labels.map((label, index) => (
          <S.TabItem
            key={label}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => handleClickTab(index)}
            isSelected={selectedIndex === index}
            $tabCount={labels.length}
          >
            {label}
          </S.TabItem>
        ))}
      </S.TabList>
      {tabContent(selectedIndex)}
    </>
  );
};

export default Tab;
