import { useLocation } from "react-router-dom";

import { FloatingButton, SearchFallback, Tab } from "@components/common";

import { extractLastPath } from "@utils/extractId";

import * as S from "./SearchPage.styled";
import TravelogueList from "./TravelogueList/TravelogueList";

const TAB_CONTENT = [
  { label: "제목", searchType: "TITLE" },
  { label: "작성자", searchType: "AUTHOR" },
] as const;

const SearchPage = () => {
  const location = useLocation();
  const encodedKeyword =
    location.pathname.split("/").length > 2 ? extractLastPath(location.pathname) : "";
  const keyword = encodedKeyword ? decodeURIComponent(encodedKeyword) : "";

  if (!keyword) {
    return (
      <S.Layout>
        <S.SearchFallbackWrapper>
          <SearchFallback
            title="보고 싶은 여행기를 검색해 주세요!"
            text="여행기 키워드를 입력해봐요!"
          />
        </S.SearchFallbackWrapper>
      </S.Layout>
    );
  }

  return (
    <>
      <Tab
        labels={TAB_CONTENT.map((tab) => tab.label)}
        tabContent={(selectedIndex) => (
          <TravelogueList
            key={`${keyword}-${TAB_CONTENT[selectedIndex].searchType}`}
            keyword={keyword}
            searchType={TAB_CONTENT[selectedIndex].searchType}
          />
        )}
        css={S.TabStyle}
      />
      <FloatingButton />
    </>
  );
};

export default SearchPage;
