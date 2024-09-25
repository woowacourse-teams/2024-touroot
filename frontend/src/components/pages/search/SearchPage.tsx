import { useLocation } from "react-router-dom";

import { FloatingButton, SearchFallback, Tab } from "@components/common";

import { extractLastPath } from "@utils/extractId";

import * as S from "./SearchPage.styled";
import TravelogueList from "./TravelogueList/TravelogueList";

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
            title="보고 싶은 여행기를 검색해주세요!"
            text="여행기 키워드를 입력해봐요!"
          />
        </S.SearchFallbackWrapper>
      </S.Layout>
    );
  }

  return (
    <S.Layout>
      <FloatingButton />
      <Tab
        labels={["제목", "작성자"]}
        tabContent={(selectedIndex) => (
          <TravelogueList
            key={`${keyword}-${selectedIndex}`}
            keyword={keyword}
            searchType={selectedIndex === 0 ? "TITLE" : "AUTHOR"}
          />
        )}
        css={S.TabStyle}
      />
    </S.Layout>
  );
};

export default SearchPage;
