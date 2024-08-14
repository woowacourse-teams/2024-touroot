import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

import { STORAGE_KEYS_MAP } from "@constants/storage";

import * as S from "./Tab.styled";
import { FIRST_TAB_INDEX, INITIAL_SCROLL_LEFT, INITIAL_START_X } from "./constants";

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
  const tabListRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(INITIAL_START_X);
  const [scrollLeft, setScrollLeft] = useState(INITIAL_SCROLL_LEFT);

  const handleClickTab = (index: number) => {
    setSelectedIndex(index);
    localStorage.setItem(storageKey, JSON.stringify(index));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (tabListRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - tabListRef.current.offsetLeft);
      setScrollLeft(tabListRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (tabListRef.current) {
      const x = e.pageX - tabListRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      tabListRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <>
      <S.TabList
        ref={tabListRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
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
