import { css } from "@emotion/react";

import { IconButton } from "@components/common";

import { SEMANTIC_COLORS } from "@styles/tokens";

import * as S from "./MyPageTabContent.styled";

const ICON_BUTTON_TEXT = {
  ADD_TRAVEL_PLAN: "새 여행 계획 추가하기",
  ADD_TRAVELOGUE: "새 여행기 추가하기",
} as const;

interface MyPageTabContentProps<T extends { id: string }> {
  iconButtonLabel: (typeof ICON_BUTTON_TEXT)[keyof typeof ICON_BUTTON_TEXT];
  onClickIconButton: () => void;
  contentDetail: T[];
  renderItem: (item: T) => React.ReactNode;
}

const MyPageTabContent = <T extends { id: string }>({
  contentDetail,
  iconButtonLabel,
  onClickIconButton,
  renderItem,
}: React.PropsWithChildren<MyPageTabContentProps<T>>) => {
  return (
    <S.List>
      <IconButton
        size="16"
        position="left"
        iconType="plus"
        color={SEMANTIC_COLORS.primary}
        css={[
          S.ColorButtonStyle,
          css`
            font-weight: 600;
          `,
        ]}
        onClick={onClickIconButton}
      >
        {iconButtonLabel}
      </IconButton>

      {contentDetail.map((item) => (
        <S.BoxButton key={item.id}>{renderItem(item)}</S.BoxButton>
      ))}
    </S.List>
  );
};

export default MyPageTabContent;
