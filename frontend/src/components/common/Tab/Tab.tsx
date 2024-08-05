import { ComponentPropsWithoutRef, useLayoutEffect, useRef, useState } from "react";

import { STORAGE_KEYS_MAP } from "@constants/storage";

import * as S from "./Tab.styled";

interface TabProps extends React.PropsWithChildren<ComponentPropsWithoutRef<"ul">> {
  tabContent: (selectedIndex: number) => JSX.Element;
  labels: string[];
}

const Tab = ({ labels, tabContent, ...props }: TabProps) => {
  const FIRST_TAB_INDEX = 0;
  const INITIAL_START_X = 0;
  const INITIAL_SCROLL_LEFT = 0;

  const [selectedIndex, setSelectedIndex] = useState(FIRST_TAB_INDEX);

  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  const tabListRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(INITIAL_START_X);
  const [scrollLeft, setScrollLeft] = useState(INITIAL_SCROLL_LEFT);

  const handleClickTab = (index: number) => {
    setSelectedIndex(index);
    localStorage.setItem(STORAGE_KEYS_MAP.myPageSelectedTab, JSON.stringify(index));
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

  useLayoutEffect(() => {
    const currentSelectedTabIndex = JSON.parse(
      localStorage.getItem(STORAGE_KEYS_MAP.myPageSelectedTab) ?? FIRST_TAB_INDEX.toString(),
    );
    setSelectedIndex(currentSelectedTabIndex);

    return () =>
      localStorage.setItem(STORAGE_KEYS_MAP.myPageSelectedTab, JSON.stringify(FIRST_TAB_INDEX));
  }, []);

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
