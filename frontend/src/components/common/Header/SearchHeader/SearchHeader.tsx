import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import Icon from "@components/common/Icon/Icon";
import { Input } from "@components/common/Input/Input.styled";

import { ROUTE_PATHS_MAP } from "@constants/route";

import Header from "../Header";
import * as S from "./SearchHeader.styled";

const SearchHeader = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const encodedKeyword =
    location.pathname.split("/").length > 2 ? location.pathname.split("/").pop() : "";

  const receivedKeyword = encodedKeyword ? decodeURIComponent(encodedKeyword) : "";

  const [keyword, setKeyword] = useState(() => {
    return receivedKeyword === ":id" ? "" : receivedKeyword;
  });

  const handleClickSearchButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.length < 2) {
      alert("2글자 이상 검색해주세요.");
    } else {
      navigate(ROUTE_PATHS_MAP.search(keyword));
    }
  };

  const handleClickDeleteButton = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setKeyword("");
    document.querySelector("input")?.focus();
  };

  return (
    <Header
      rightContent={
        <S.FormWrapper onSubmit={handleClickSearchButton}>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            autoFocus
            placeholder="검색해주세요"
            css={css`
              height: 4rem;
            `}
          />
          <S.ButtonContainer>
            <S.DeleteButton
              title="delete keyword button"
              type="button"
              onClick={handleClickDeleteButton}
            >
              <Icon iconType="x-icon" size="8" />
            </S.DeleteButton>
            <button title="search button" type="submit">
              <Icon iconType="search-icon" size="18" />
            </button>
          </S.ButtonContainer>
        </S.FormWrapper>
      }
      $isRightContentFull
    />
  );
};

export default SearchHeader;
