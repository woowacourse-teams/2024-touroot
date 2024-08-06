import { css } from "@emotion/react";

import { IconButton } from "@components/common";

import { SEMANTIC_COLORS } from "@styles/tokens";

import * as S from "./TabContent.styled";

const ICON_BUTTON_TEXT = {
  ADD_TRAVEL_PLAN: "새 여행 계획 추가하기",
  ADD_TRAVELOGUE: "새 여행기 추가하기",
} as const;

interface TabContentProps<T extends { id: string }> {
  iconButtonLabel: (typeof ICON_BUTTON_TEXT)[keyof typeof ICON_BUTTON_TEXT];
  onClickIconButton: () => void;
  data: T[];
  renderItem: (item: T) => React.ReactNode;
}

const TabContent = <T extends { id: string }>({
  data,
  iconButtonLabel,
  onClickIconButton,
  renderItem,
}: React.PropsWithChildren<TabContentProps<T>>) => {
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

      {data.map((item) => (
        <S.BoxButton key={item.id}>{renderItem(item)}</S.BoxButton>
      ))}
    </S.List>
  );
};

export default TabContent;
