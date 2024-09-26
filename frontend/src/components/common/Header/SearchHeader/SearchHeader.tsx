import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import Icon from "@components/common/Icon/Icon";
import IconButton from "@components/common/IconButton/IconButton";
import { Input } from "@components/common/Input/Input.styled";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
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
      alert(`${MIN_KEYWORD_LENGTH}글자 이상 검색해 주세요.`);
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
        <>
          <S.FormWrapper onSubmit={handleClickSearchButton}>
            <Input
              ref={inputRef}
              value={keyword}
              onChange={(e) =>
                setKeyword(
                  e.target.value.slice(
                    FORM_VALIDATIONS_MAP.title.minLength,
                    FORM_VALIDATIONS_MAP.title.maxLength,
                  ),
                )
              }
              autoFocus
              maxLength={20}
              placeholder="제목 또는 작성자명으로 검색해 주세요."
              css={css`
                height: 4rem;
                padding-right: 7.8rem;
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
          <IconButton
            iconType="home-icon"
            size="20"
            onClick={() => navigate(ROUTE_PATHS_MAP.root)}
          />
        </>
      }
      isRightContentFull
    />
  );
};

export default SearchHeader;
