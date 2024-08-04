import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

import { STORAGE_KEYS_MAP } from "@constants/storage";

import * as S from "./Tab.styled";

interface TabProps extends React.PropsWithChildren<ComponentPropsWithoutRef<"ul">> {
  tabContent: (selectedIndex: number) => JSX.Element;
  labels: string[];
}

const Tab = ({ labels, tabContent, ...props }: TabProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  const tabListRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  useEffect(() => {
    const currentSelectedTabIndex = JSON.parse(
      localStorage.getItem(STORAGE_KEYS_MAP.myPageSelectedTab) ?? "0",
    );
    setSelectedIndex(currentSelectedTabIndex);

    return () => localStorage.setItem(STORAGE_KEYS_MAP.myPageSelectedTab, JSON.stringify(0));
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
