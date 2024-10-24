import { TextVariants } from "@components/common/Text/Text.type";

import * as S from "./Text.styled";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  textType?: TextVariants;
  isInline?: boolean;
}

const TAG_MAP = {
  heading: "h1",
  title: "h2",
  subTitle: "h3",
  body: "p",
  bodyBold: "p",
  detail: "span",
  detailBold: "span",
} as const;

const Text = ({ children, textType = "body", isInline, ...attributes }: TextProps) => {
  return (
    <S.Text as={TAG_MAP[textType]} $textType={textType} $isInline={isInline} {...attributes}>
      {children}
    </S.Text>
  );
};

export default Text;
