import * as S from "./Box.styled";

interface BoxProps {
  placeName: string;
  tags: string[];
}

const Box = ({ placeName, tags }: BoxProps) => {
  return (
    <S.Box>
      <S.PlaceName>{placeName}</S.PlaceName>
      <S.TagList>
        {tags.map((tag) => (
          <S.Tag key={tag}>{`#${tag}`}</S.Tag>
        ))}
      </S.TagList>
    </S.Box>
  );
};

export default Box;
