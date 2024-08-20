import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import Icon from "@components/common/Icon/Icon";
import IconButton from "@components/common/IconButton/IconButton";
import { Input } from "@components/common/Input/Input.styled";

import { ROUTE_PATHS_MAP } from "@constants/route";

import { extractLastPath } from "@utils/extractId";

import Header from "../Header";
import * as S from "./SearchHeader.styled";

const MIN_KEYWORD_LENGTH = 2;

const SearchHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const encodedKeyword =
    location.pathname.split("/").length > MIN_KEYWORD_LENGTH
      ? extractLastPath(location.pathname)
      : "";

  const receivedKeyword = encodedKeyword ? decodeURIComponent(encodedKeyword) : "";

  const [keyword, setKeyword] = useState(() => {
    return receivedKeyword === ":id" ? "" : receivedKeyword;
  });

  useEffect(() => {
    setKeyword(receivedKeyword);
  }, [receivedKeyword]);

  const handleClickSearchButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim().length < MIN_KEYWORD_LENGTH) {
      alert(`${MIN_KEYWORD_LENGTH}글자 이상 검색해주세요.`);
      setKeyword(keyword.trim());
    } else {
      navigate(ROUTE_PATHS_MAP.search(keyword));
    }
  };

  const handleClickDeleteButton = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setKeyword("");
    inputRef.current?.focus();
  };

  return (
    <Header
      rightContent={
        <S.FormWrapper onSubmit={handleClickSearchButton}>
          <Input
            ref={inputRef}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            autoFocus
            placeholder="검색해주세요"
            css={css`
              height: 4rem;
            `}
            variant="round"
          />
          <S.ButtonContainer>
            <S.DeleteButton
              title="delete keyword button"
              type="button"
              onClick={handleClickDeleteButton}
            >
              <Icon iconType="x-icon" size="8" />
            </S.DeleteButton>
            <IconButton iconType="search-icon" size="18" title="search button" type="submit" />
          </S.ButtonContainer>
        </S.FormWrapper>
      }
      $isRightContentFull
    />
  );
};

export default SearchHeader;
