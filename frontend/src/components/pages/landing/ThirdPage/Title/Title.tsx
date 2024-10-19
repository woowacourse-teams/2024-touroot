import * as S from "./Title.styled";

const Title = ({ children }: React.PropsWithChildren) => {
  return (
    <S.Layout>
      <S.Line />
      {children}
      <S.Line />
    </S.Layout>
  );
};

export default Title;
