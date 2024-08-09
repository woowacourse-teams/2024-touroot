import React from "react";

import * as S from "./Box.styled";

interface BoxProps {
  placeName: string;
  tags: string[];
}

const Box = ({
  children,
  placeName,
  tags,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & React.PropsWithChildren<BoxProps>) => {
  return (
    <S.Box {...props}>
      <>
        <S.PlaceName>{placeName}</S.PlaceName>
        <S.TagList>
          {tags.map((tag) => (
            <S.Tag key={tag}>{`#${tag}`}</S.Tag>
          ))}
        </S.TagList>
      </>
      {children}
    </S.Box>
  );
};

export default Box;
