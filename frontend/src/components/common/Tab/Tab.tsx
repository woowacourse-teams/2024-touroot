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

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useDragScroll<HTMLUListElement>();

  const handleClickTab = (index: number) => {
    setSelectedIndex(index);
    localStorage.setItem(storageKey, JSON.stringify(index));
  };

  return (
    <>
      <S.TabList
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        aria-label="탭을 누르면 관련된 컨텐츠를 볼 수 있습니다"
        {...props}
      >
        {labels.map((label, index) => (
          <S.TabItem $tabCount={labels.length}>
            <S.TabItemContent
              key={label}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => handleClickTab(index)}
              isSelected={selectedIndex === index}
            >
              {label}
            </S.TabItemContent>
          </S.TabItem>
        ))}
      </S.TabList>
      {tabContent(selectedIndex)}
    </>
  );
};

export default Tab;
