import { TextVariants } from "@components/common/Text/Text.type";

import * as S from "./Text.styled";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  textType?: TextVariants;
}

const TAG_MAP = {
  heading: "h1",
  title: "h2",
  subTitle: "h3",
  body: "p",
  detail: "span",
} as const;

const Text = ({ children, textType = "body", ...attributes }: TextProps) => {
  return (
    <S.Text as={TAG_MAP[textType]} $textType={textType} {...attributes}>
      {children}
    </S.Text>
  );
};

export default Text;
