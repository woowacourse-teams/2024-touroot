import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import { Button, Text } from "@components/common";

import { ROUTE_PATHS_MAP } from "@constants/route";

import { SEMANTIC_COLORS } from "@styles/tokens";

// import { Tturi } from "@assets/svg";
import * as S from "./NotFoundPage.styled";

const NotFoundPage = () => {
  const navigation = useNavigate();

  return (
    <S.Layout>
      <S.TextContainer>
        <S.Title>
          {/* <S.ImageWrapper>
            <Tturi />
          </S.ImageWrapper> */}

          <Text
            textType="title"
            css={css`
              color: ${SEMANTIC_COLORS.primary};
              font-size: 6rem;
            `}
          >
            404
          </Text>
          <Text textType="title">Not Found</Text>
        </S.Title>

        <S.DescriptionContainer>
          <Text>앗! 페이지를 찾을 수 없습니다</Text>
          <Text>다시 시도해주세요!</Text>
        </S.DescriptionContainer>
      </S.TextContainer>

      <S.ButtonContainer>
        <Button onClick={() => navigation(ROUTE_PATHS_MAP.root)}>홈으로 돌아가기</Button>
        <Button onClick={() => navigation(ROUTE_PATHS_MAP.back)}>이전 페이지로로 돌아가기</Button>
      </S.ButtonContainer>
    </S.Layout>
  );
};

export default NotFoundPage;
