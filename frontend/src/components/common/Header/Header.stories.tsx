import type { Meta, StoryObj } from "@storybook/react";

import Icon from "../Icon/Icon";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import Header from "./Header";
import * as S from "./SearchHeader/SearchHeader.styled";

const rightContentOptions = {
  None: null,
  HomeIcon: <IconButton iconType="home-icon" size="20" />,
  SearchIcon: <IconButton iconType="search-icon" size="18" />,
  SearchForm: (
    <>
      <S.FormWrapper>
        <Input
          autoFocus
          placeholder="제목 또는 작성자명으로 검색해 주세요."
          style={{ height: "4rem", marginBottom: "-1rem" }}
        />
        <S.ButtonContainer>
          <S.DeleteButton title="delete keyword button" type="button">
            <Icon iconType="x-icon" size="8" />
          </S.DeleteButton>
          <IconButton iconType="search-icon" size="18" />
        </S.ButtonContainer>
      </S.FormWrapper>
      <IconButton iconType="home-icon" size="20" onClick={() => {}} />
    </>
  ),
};

const meta = {
  title: "common/Header",
  component: Header,
  argTypes: {
    isHamburgerUsed: { control: "boolean" },
    isLogoUsed: { control: "boolean" },
    rightContent: {
      options: Object.keys(rightContentOptions),
      mapping: rightContentOptions,
      control: {
        type: "select",
      },
    },
    isRightContentFull: { control: "boolean" },
  },
  decorators: [
    (Story, context) => {
      return (
        <div style={{ padding: 0, width: "48rem", position: "relative" }}>
          <Story args={{ ...context.args }} />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultHeader: Story = {
  args: {
    isHamburgerUsed: true,
    rightContent: "HomeIcon",
  },
};

export const HomePageHeader: Story = {
  args: {
    isLogoUsed: true,
    isHamburgerUsed: true,
    rightContent: "SearchIcon",
  },
};

export const SearchResultPageHeader: Story = {
  args: {
    isHamburgerUsed: true,
    rightContent: "SearchIcon",
  },
};

export const SearchHeader: Story = {
  args: {
    rightContent: "SearchForm",
    isRightContentFull: true,
  },
};
